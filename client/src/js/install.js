const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // remove
  butInstall.classList.toggle('hidden, false');
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {

  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
   return;
  }

  //prompt
  promptEvent.prompt();
  
  // Reset the deferred prompt variable, it can only be used once.
  window.deferredPrompt = null;
  
  butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
  // Log the installation to your analytics
  console.log('Jate PWA was installed', event);
}
);


