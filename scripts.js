document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".year");
  const dots = document.querySelectorAll(".dot");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");

          const index = entry.target.getAttribute("data-index");
          dots.forEach(dot => dot.classList.remove("active"));
          if (dots[index]) dots[index].classList.add("active");
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach(section => observer.observe(section));
});
