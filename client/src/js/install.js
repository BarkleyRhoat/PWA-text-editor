// const butInstall = document.getElementById('buttonInstall');

// // Logic for installing the PWA
// // TODO: Add an event handler to the `beforeinstallprompt` event
// window.addEventListener('beforeinstallprompt', (event) => {
//   // Stash the event so it can be triggered later.
//   window.deferredPrompt = event;
//   // remove
//   butInstall.classList.toggle('hidden, false');
// });

// // TODO: Implement a click event handler on the `butInstall` element
// butInstall.addEventListener('click', async () => {

//   const promptEvent = window.deferredPrompt;

//   if (!promptEvent) {
//    return;
//   }

//   //prompt
//   promptEvent.prompt();
  
//   // Reset the deferred prompt variable, it can only be used once.
//   window.deferredPrompt = null;
  
//   butInstall.classList.toggle('hidden', true);
// });

// // TODO: Add an handler for the `appinstalled` event
// window.addEventListener('appinstalled', (event) => {
//   // Clear the deferredPrompt so it can be garbage collected
//   window.deferredPrompt = null;
//   // Log the installation to your analytics
//   console.log('Jate PWA was installed', event);
// }
// );
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {});
async function installPWA(event) {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = event;
  // Update UI notify the user they can install the PWA
  butInstall.style.display = 'block';
}

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => { 
  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  // Optionally, send analytics event with outcome of user choice
  console.log(`User response to the install prompt: ${outcome}`);
  // We no longer need the prompt. Clear it up.
  deferredPrompt = null;
  // Hide the install button
  butInstall.style.display = 'none';
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Clear the deferredPrompt so it can be garbage collected
  deferredPrompt = null;
  // Log the installation to your analytics
  console.log('Jate PWA was installed', event);
}
);


