
  gsap.registerPlugin(ScrollTrigger);

  // ── CURSOR ──
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1 });
  });
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    gsap.set(follower, { x: followerX, y: followerY });
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { width: 6, height: 6, duration: 0.2 });
      gsap.to(follower, { width: 60, height: 60, opacity: 0.3, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { width: 12, height: 12, duration: 0.2 });
      gsap.to(follower, { width: 36, height: 36, opacity: 0.5, duration: 0.3 });
    });
  });

  // ── SCROLL PROGRESS LINE ──
  window.addEventListener('scroll', () => {
    const progress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('scrollLine').style.width = progress + '%';
  });

  // ── GSAP SCROLL REVEALS ──
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        delay: (i % 3) * 0.1
      }
    );
  });

  // ── HERO STAGGER on load ──
  gsap.timeline({ defaults: { ease: 'power4.out' } })
    .from('nav', { y: -60, opacity: 0, duration: 0.8 })
    .from('.hero-bg .reveal', { opacity: 0, y: 80, stagger: 0.15, duration: 1 }, '-=0.4');

  // ── MOBILE MENU ──
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // ── BENTO CARD number animation on scroll ──
  document.querySelectorAll('.num-tag').forEach(tag => {
    ScrollTrigger.create({
      trigger: tag,
      start: 'top 90%',
      onEnter: () => {
        gsap.fromTo(tag, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' });
      }
    });
  });

  // ── STAT counter animation ──
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.textContent);
    if (!isNaN(target)) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo({ val: 0 }, { val: target, duration: 1.5, ease: 'power2.out',
            onUpdate: function() {
              el.textContent = Math.round(this.targets()[0].val) + (el.textContent.includes('+') ? '+' : '');
            }
          });
        }
      });
    }
  });

  // ── NAV scroll effect ──
  ScrollTrigger.create({
    start: 80,
    onUpdate: (self) => {
      const nav = document.querySelector('nav');
      if (self.progress > 0) {
        nav.style.borderBottomColor = 'rgba(0,204,51,0.2)';
      } else {
        nav.style.borderBottomColor = 'var(--border)';
      }
    }
  });
