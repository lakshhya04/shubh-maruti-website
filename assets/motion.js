/* Motion for the Shubh Maruti page (GSAP + ScrollTrigger, both served from assets/vendor).
   Kept to a few moments that mean something:
   1. the hero opening: headline lines rise out of a mask, then the caption; a red line fills
      along the top of the box over the 7 seconds before the next highlight
   2. the About statement lights up word by word as you read down the page
   3. photos in About, Services and Sectors are revealed once, like a blind lifting; the two
      About photos drift at different speeds
   4. network and step rules draw across as they come into view
   5. choosing a service wipes its picture in and brings the text up
   6. a thin red line at the top shows how far down the page you are
   Everything is skipped when the visitor has reduced motion on, and the page reads fine without it. */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const OUT = "power3.out", INOUT = "power3.inOut";
  const M = (window.Motion = {});

  /* ---- 1. hero ---- */
  const title = $("#heroTitle"), cap = $("#heroCap"), more = $("#heroMore"), prog = $("#heroProg");
  gsap.set([title, cap, more], { autoAlpha: 0 });
  let heroTl;
  const heroIn = () => {
    const spans = $$("span", title);
    if (!spans.length) return;
    spans.forEach((sp) => { if (!sp.firstElementChild) sp.innerHTML = `<b class="ln">${sp.textContent}</b>`; });
    heroTl && heroTl.kill();
    heroTl = gsap.timeline()
      .set(title, { autoAlpha: 1 })
      .fromTo($$(".ln", title), { yPercent: 112 }, { yPercent: 0, duration: 0.95, ease: "power4.out", stagger: 0.09 })
      .fromTo([cap, more], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: OUT, stagger: 0.08 }, "-=0.6");
  };
  new MutationObserver(heroIn).observe(title, { childList: true });
  setTimeout(() => { if (getComputedStyle(title).visibility === "hidden") heroIn(); }, 1600);

  let pt;
  M.progress = (active) => {
    if (!prog) return;
    if (!active) { pt && pt.pause(); return; }
    pt && pt.kill();
    pt = gsap.fromTo(prog, { scaleX: 0 }, { scaleX: 1, duration: 7, ease: "none" });
  };
  M.progress(true);

  /* ---- 6. scroll line ---- */
  gsap.to("#scrollbar", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

  /* ---- 2. about statement ---- */
  const st = $("#aboutStatement");
  if (st) {
    const txt = st.textContent.trim();
    st.setAttribute("aria-label", txt);
    st.innerHTML = txt.split(/\s+/).map((w) => `<span class="w" aria-hidden="true">${w}</span>`).join(" ");
    gsap.fromTo($$(".w", st), { opacity: 0.2 }, { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: st, start: "top 82%", end: "bottom 50%", scrub: 0.5 } });
  }

  /* ---- 3. photos ---- */
  $$(".about .photo").forEach((p, i) => {
    gsap.fromTo(p, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: INOUT, scrollTrigger: { trigger: p, start: "top 88%", once: true } });
    gsap.fromTo(p, { y: i ? -36 : 36 }, { y: i ? 36 : -36, ease: "none", scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: true } });
  });
  gsap.set(".sector .pic", { clipPath: "inset(0 0 100% 0)" });
  gsap.set(".sector .body", { autoAlpha: 0 });
  ScrollTrigger.batch(".sector", {
    start: "top 90%", once: true,
    onEnter: (els) => {
      gsap.to(els.map((e) => $(".pic", e)), { clipPath: "inset(0 0 0% 0)", duration: 1, ease: INOUT, stagger: 0.12 });
      gsap.fromTo(els.map((e) => $(".body", e)), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: OUT, stagger: 0.12, delay: 0.35 });
    },
  });

  /* ---- 4. rules that draw in ---- */
  const draw = (sel) => {
    $$(sel).forEach((el) => { gsap.set(el, { "--d": 0 }); gsap.set($$(":scope > *", el), { autoAlpha: 0 }); });
    ScrollTrigger.batch(sel, {
      start: "top 92%", once: true,
      onEnter: (els) => {
        gsap.to(els, { "--d": 1, duration: 0.9, ease: INOUT, stagger: 0.1 });
        gsap.fromTo(els.flatMap((e) => $$(":scope > *", e)), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: OUT, stagger: 0.04, delay: 0.25 });
      },
    });
  };
  draw(".place");

  /* the route: a truck travels the line, stops light up as it reaches them */
  const route = $("#steps"), truck = $("#routeTruck"), stops = $$("li", route);
  if (route && truck && stops.length) {
    route.classList.add("live");
    const mobile = () => matchMedia("(max-width: 900px)").matches;
    const at = (i) => (mobile() ? { x: 0, y: stops[i].offsetTop + 16 - 20 } : { x: stops[i].offsetLeft + 8 - 20, y: 14 - 20 });
    const place = (p) => {
      const n = stops.length - 1, f = Math.min(1, Math.max(0, p)) * n, i = Math.min(n - 1, Math.floor(f)), t = f - i;
      const a = at(i), b = at(i + 1);
      gsap.set(truck, { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
      route.style.setProperty("--f", mobile() ? ((at(i).y + 20 - 16 + (b.y - a.y) * t) / route.offsetHeight).toFixed(4) : (((a.x + 20 - 8) + (b.x - a.x) * t) / route.offsetWidth).toFixed(4));
      stops.forEach((li, k) => li.classList.toggle("on", k <= f + 0.03));
    };
    route.style.setProperty("--f", 0); place(0);
    ScrollTrigger.create({ trigger: route, start: "top 78%", end: () => (mobile() ? "bottom 60%" : "bottom 30%"), scrub: true, invalidateOnRefresh: true, onUpdate: (self) => place(self.progress), onRefresh: (self) => place(self.progress) });
  }

  /* ---- 5. services ---- */
  M.service = () => {
    gsap.fromTo("#svcPh", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: INOUT, clearProps: "clipPath" });
    gsap.fromTo($$("#svcDetail > *"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: OUT, stagger: 0.07, clearProps: "transform,opacity,visibility" });
  };

  addEventListener("load", () => ScrollTrigger.refresh());
})();
