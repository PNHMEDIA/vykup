 // Mobile Navigation
 const hamburger = document.getElementById('hamburger');
 const mobileMenu = document.getElementById('mobileMenu');
 const mobileOverlay = document.getElementById('mobileOverlay');
 const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
 const closeMenuButton = document.getElementById('close-menu-btn');

 function toggleMobileMenu() {
     hamburger.classList.toggle('open');
     mobileMenu.classList.toggle('open');
     mobileOverlay.classList.toggle('hidden');
     document.body.classList.toggle('overflow-hidden');
 }

 function closeMobileMenu() {
     hamburger.classList.remove('open');
     mobileMenu.classList.remove('open');
     mobileOverlay.classList.add('hidden');
     document.body.classList.remove('overflow-hidden');
 }

 

 hamburger.addEventListener('click', toggleMobileMenu);
 mobileOverlay.addEventListener('click', closeMobileMenu);
 closeMenuButton.addEventListener('click', closeMobileMenu); 
 
 mobileNavLinks.forEach(link => {
     link.addEventListener('click', closeMobileMenu);
 });

 // FAQ Functionality
 document.querySelectorAll('.faq-question').forEach(question => {
     question.addEventListener('click', () => {
         const faqItem = question.closest('.faq-item');
         const isActive = faqItem.classList.contains('active');
         
         // Close all FAQ items
         document.querySelectorAll('.faq-item').forEach(item => {
             item.classList.remove('active');
         });
         
         // Open clicked item if it wasn't active
         if (!isActive) {
             faqItem.classList.add('active');
         }
     });
 });

 // Handle select placeholder color
 document.querySelectorAll('.form-select').forEach(select => {
     function updateSelectColor() {
         if (select.value === "") {
             select.style.color = "#CBD5E1";
         } else {
             select.style.color = "#1E293B";
         }
     }
     
     updateSelectColor();
     select.addEventListener('change', updateSelectColor);
 });

 // Handle input and textarea placeholder behavior
 document.querySelectorAll('.form-input').forEach(input => {
     const originalPlaceholder = input.placeholder;
     
     input.addEventListener('focus', function() {
         this.placeholder = '';
     });
     
     input.addEventListener('blur', function() {
         if (this.value === '') {
             this.placeholder = originalPlaceholder;
         }
     });
     
     // Ensure text color is always dark when typing
     input.addEventListener('input', function() {
         this.style.color = '#1E293B';
     });
 });

 // Contact Popup functionality
 const contactPopup = document.getElementById('contactPopup');
 const closePopup = document.getElementById('closePopup');
 const ctaButtons = document.querySelectorAll('.cta-button');

 function openContactPopup(e) {
     // Only open popup for CTA buttons that link to contact section
     if (e.target.getAttribute('href') === '#kontakt' || e.target.closest('a')?.getAttribute('href') === '#kontakt') {
         e.preventDefault();
         contactPopup.classList.add('active');
         document.body.style.overflow = 'hidden';
         
         // Initialize select color handling for popup form
         setTimeout(() => {
             const popupSelect = contactPopup.querySelector('.form-select');
             if (popupSelect && !popupSelect.hasAttribute('data-initialized')) {
                 function updateSelectColor() {
                     if (popupSelect.value === "") {
                         popupSelect.style.color = "#CBD5E1";
                     } else {
                         popupSelect.style.color = "#1E293B";
                     }
                 }
                 
                 updateSelectColor();
                 popupSelect.addEventListener('change', updateSelectColor);
                 popupSelect.setAttribute('data-initialized', 'true');
             }
         }, 100);
     }
 }

 function closeContactPopup() {
     contactPopup.classList.remove('active');
     document.body.style.overflow = '';
 }

 // Add click listeners to CTA buttons
 ctaButtons.forEach(button => {
     // Skip the button inside the popup to avoid recursive popup opening
     if (!button.closest('#contactPopup')) {
         button.addEventListener('click', openContactPopup);
     }
 });

 // Close popup listeners
 closePopup.addEventListener('click', closeContactPopup);
 
 contactPopup.addEventListener('click', (e) => {
     if (e.target === contactPopup) {
         closeContactPopup();
     }
 });

 // Close popup with Escape key
 document.addEventListener('keydown', (e) => {
     if (e.key === 'Escape' && contactPopup.classList.contains('active')) {
         closeContactPopup();
     }
 });

 // Handle popup form submission
 document.getElementById('popupContactForm').addEventListener('submit', (e) => {
     e.preventDefault();
     alert('Děkujeme za Vaši zprávu! Ozveme se Vám do 24 hodin.');
     closeContactPopup();
 });

 // GSAP Animations
 document.addEventListener('DOMContentLoaded', () => {
     gsap.registerPlugin(ScrollTrigger, TextPlugin);

     // Hero Section Animation
     const heroTl = gsap.timeline({defaults: {ease: 'power3.out'}});
     heroTl.to('#hero-title', {opacity: 1, y: 0, duration: 1.2})
       .to('#hero-subtitle', {opacity: 1, y: 0, duration: 1}, '-=0.8')
       .to('#hero-button', {opacity: 1, y: 0, duration: 0.8}, '-=0.6')
       .to('#hero-cards', {opacity: 1, y: 0, duration: 1}, '-=0.4');

     // Stats Counter Animation
     const statsCounters = document.querySelectorAll('.stat-number');
     statsCounters.forEach(counter => {
         const target = parseInt(counter.dataset.target);
         
         gsap.fromTo(counter, {
             innerHTML: 0
         }, {
             innerHTML: target,
             duration: 2,
             ease: 'power2.out',
             snap: { innerHTML: 1 },
             scrollTrigger: {
                 trigger: counter,
                 start: 'top 80%',
                 toggleActions: 'play none none reverse'
             }
         });
     });

     // Timeline Animation
     const timelineLineAnimation = gsap.fromTo('.timeline-line', 
         { scaleY: 0, transformOrigin: 'top center' },
         {
             scaleY: 1,
             duration: 2,
             ease: 'power2.inOut',
             scrollTrigger: {
                 trigger: '.timeline-container',
                 start: 'top 70%',
                 end: 'bottom 30%',
                 toggleActions: 'play none none reverse'
             }
         }
     );

     // Timeline Steps Animation
     const timelineSteps = gsap.utils.toArray('.timeline-step');
     timelineSteps.forEach((step, index) => {
         gsap.fromTo(step,
             { 
                 opacity: 0, 
                 y: 50,
                 scale: 0.8
             },
             {
                 opacity: 1,
                 y: 0,
                 scale: 1,
                 duration: 0.8,
                 ease: 'power3.out',
                 delay: index * 0.2,
                 scrollTrigger: {
                     trigger: step,
                     start: 'top 85%',
                     toggleActions: 'play none none reverse'
                 }
             }
         );

         const icon = step.querySelector('.timeline-icon');
         if (icon) {
             gsap.fromTo(icon,
                 { 
                     scale: 0,
                     rotation: -180
                 },
                 {
                     scale: 1,
                     rotation: 0,
                     duration: 0.6,
                     ease: 'back.out(1.7)',
                     delay: (index * 0.2) + 0.3,
                     scrollTrigger: {
                         trigger: step,
                         start: 'top 85%',
                         toggleActions: 'play none none reverse'
                     }
                 }
             );
         }
     });

     // FAQ Items staggered reveal
     gsap.utils.toArray('.faq-item').forEach((item, index) => {
         gsap.fromTo(item,
             { opacity: 0, y: 30 },
             {
                 opacity: 1,
                 y: 0,
                 duration: 0.6,
                 delay: index * 0.1,
                 ease: 'power2.out',
                 scrollTrigger: {
                     trigger: item,
                     start: 'top 90%',
                     toggleActions: 'play none none none'
                 }
             }
         );
     });

     // General section reveal with stagger
     gsap.utils.toArray('.gsap-reveal').forEach((elem, index) => {
         const delay = elem.classList.contains('section-header') ? 0 : index * 0.1;
         
         gsap.fromTo(elem, 
             { opacity: 0, y: 60, visibility: 'hidden' }, 
             {
                 opacity: 1, y: 0, visibility: 'visible',
                 duration: 1, ease: 'power3.out',
                 delay: delay,
                 scrollTrigger: {
                     trigger: elem,
                     start: 'top 85%',
                     toggleActions: 'play none none none'
                 }
             }
         );
     });

     // Smooth scrolling for anchor links
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
         anchor.addEventListener('click', function (e) {
             e.preventDefault();
             const target = document.querySelector(this.getAttribute('href'));
             if (target) {
                 target.scrollIntoView({
                     behavior: 'smooth',
                     block: 'start'
                 });
             }
         });
     });
 });