<script lang="ts">
   import { config } from '$lib/config';
</script>

<footer id="footer" class="bg-primary border-t border-white/5 pt-16 pb-8 relative text-mist">
   <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
           
           <!-- Brand & Info -->
           <div class="lg:col-span-1 border-b border-white/5 pb-8 lg:border-0 lg:pb-0">
               <a href="/" class="flex items-center gap-3 mb-6">
                  <img src={config.branding.logos.symbol} alt={config.doctor.name} class="w-10 h-10 object-contain" />
                 <div>
                   <h2 class="text-xl font-bold leading-tight">{config.sections.footer.logoText}</h2>
                   <p class="text-xs text-slate-400 font-medium tracking-wide uppercase">{config.doctor.title}</p>
                 </div>
               </a>
               <p class="text-mist/60 text-sm leading-relaxed mb-6">
                   {config.sections.footer.description}
               </p>
               
               <!-- Socials -->
               <div class="flex space-x-4">
                   {#each config.socials as social}
                       <a href={social.url} target="_blank" rel="noopener noreferrer" class="text-mist/60 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-accent" aria-label={social.platform}>
                            {#if social.icon === 'facebook'}
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"/></svg>
                            {:else if social.icon === 'twitter'}
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                            {:else if social.icon === 'linkedin'}
                                 <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"/></svg>
                            {:else}
                                {social.platform}
                            {/if}
                       </a>
                   {/each}
               </div>
           </div>

           <!-- Links -->
           <div>
               <h3 class="text-sm font-bold uppercase tracking-wider mb-6 text-cream border-b border-white/10 pb-2 inline-block">Quick Links</h3>
               <ul class="space-y-3">
                   <li><a href="/" class="text-mist/60 hover:text-white transition-colors text-sm">Home</a></li>
                   <li><a href="#about" class="text-mist/60 hover:text-white transition-colors text-sm">About Doctor</a></li>
                   <li><a href="#services" class="text-mist/60 hover:text-white transition-colors text-sm">Services</a></li>
                   <li><a href="#contact" class="text-mist/60 hover:text-white transition-colors text-sm">Book Appointment</a></li>
               </ul>
           </div>

           <!-- Contact Info -->
           <div>
               <h3 class="text-sm font-bold uppercase tracking-wider mb-6 text-cream border-b border-white/10 pb-2 inline-block">Contact Us</h3>
               <ul class="space-y-4">
                   <li class="flex items-start">
                       <svg class="shrink-0 w-5 h-5 text-accent mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                       <span class="text-mist/60 text-sm">{config.contact.address}</span>
                   </li>
                   <li class="flex items-center">
                       <svg class="shrink-0 w-5 h-5 text-accent mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                       <span class="text-mist/60 text-sm">{config.contact.phone}</span>
                   </li>
                   <li class="flex items-center">
                       <svg class="shrink-0 w-5 h-5 text-accent mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                       <span class="text-mist/60 text-sm">{config.contact.email}</span>
                   </li>
               </ul>
           </div>

           <!-- Working Hours -->
           <div>
               <h3 class="text-sm font-bold uppercase tracking-wider mb-6 text-cream border-b border-white/10 pb-2 inline-block">Clinic Hours</h3>
               <ul class="space-y-3">
                   {#each config.contact.workingHours as hours}
                       <li class="flex justify-between text-sm">
                           <span class="text-mist/60">{hours.day}</span>
                           <span class="font-medium text-white">{hours.time}</span>
                       </li>
                   {/each}
               </ul>
                <div class="mt-6">
                    <a href="tel:{config.contact.phone}" class="btn btn-gold py-2 px-4 w-full text-center block text-sm">Call Now</a>
                </div>
           </div>
       </div>

       <!-- Copyright -->
       <div class="border-t border-white/5 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-mist/40">
           <p>{config.sections.footer.copyrightText}</p>
           <div class="mt-4 md:mt-0 space-x-4">
               <a href="/" class="hover:text-white transition-colors">Privacy Policy</a>
               <a href="/" class="hover:text-white transition-colors">Terms of Service</a>
           </div>
       </div>
   </div>
</footer>
