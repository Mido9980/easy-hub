(() => {
  const apps = window.HUB_APPS || [], cats = window.HUB_CATS || [];
  const $ = id => document.getElementById(id);
  let cat = "all", q = "";

  $("stats").innerHTML = `<span><b>${apps.length}</b> تطبيق</span><span><b>${new Set(apps.map(a=>a.cat)).size}</b> تصنيف</span><span><b>${apps.filter(a=>a.status==="live").length}</b> شغال</span><span>API جاهز</span>`;

  $("chips").innerHTML = cats.map(([id,l]) => `<button data-c="${id}" class="${id==="all"?"on":""}">${l}</button>`).join("");
  document.querySelectorAll("[data-c]").forEach(b => b.onclick = () => {
    cat = b.dataset.c;
    document.querySelectorAll("[data-c]").forEach(x => x.classList.toggle("on", x === b));
    paint();
  });

  $("q").oninput = e => { q = e.target.value.trim().toLowerCase(); paint(); };

  function paint() {
    const list = apps.filter(a =>
      (cat === "all" || a.cat === cat) &&
      (!q || a.name.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q) || (a.tags||[]).some(t => t.toLowerCase().includes(q)))
    );
    $("grid").innerHTML = list.length ? list.map(a => `
      <article class="card">
        <span class="badge ${a.status}">${a.status === "live" ? "شغال" : "تجريبي"}</span>
        <div class="top"><div class="ico">${a.icon}</div><h3>${a.name}</h3></div>
        <p>${a.desc}</p>
        <div class="tags">${(a.tags||[]).map(t=>`<span>${t}</span>`).join("")}</div>
        <div class="acts">
          <a class="btn gold" href="${a.url}" target="_blank" rel="noopener">تشغيل</a>
          <a class="btn" href="api/apps/${a.slug}.json" target="_blank" rel="noopener">API</a>
          ${a.apk ? `<a class="btn" href="${a.apk}" download>⬇️ APK</a>` : ""}
          ${a.repo ? `<a class="btn" href="${a.repo}" target="_blank" rel="noopener">كود</a>` : ""}
        </div>
      </article>`).join("") : '<p class="empty">مفيش نتائج — جرّب كلمة تانية</p>';
  }

  const origin = location.origin;
  $("apiSample").textContent =
`// كل التطبيقات
const res = await fetch("${origin}/api/apps.json");
const { count, apps } = await res.json();

// تطبيق واحد
const quran = await (await fetch("${origin}/api/apps/quran.json")).json();`;

  /* install */
  let deferred = null;
  addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferred = e; $("installBtn").hidden = false; });
  $("installBtn").onclick = async () => {
    if (!deferred) return;
    deferred.prompt();
    await deferred.userChoice.catch(() => null);
    deferred = null; $("installBtn").hidden = true;
  };

  if ("serviceWorker" in navigator) addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  paint();
})();
