document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.querySelector('.site-loader').style.display = 'none';
  }, 500);

  AOS.init({
    duration: 1600,
  });
  window.addEventListener('scroll', function() {
    AOS.init();
  });

  const counters = document.querySelectorAll('.count');
  const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
  };
  function animateCounter(counter) {
    const updateCount = () => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / 200;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
  }
  const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateCounter(entry.target);
              observer.unobserve(entry.target);
          }
      });
  }, options);
  counters.forEach(counter => {
      observer.observe(counter);
  });
});