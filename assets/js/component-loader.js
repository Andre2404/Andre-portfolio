'use strict';

/**
 * C  mponent Loader
 * Loads HTML components from separate files
 */

async function loadComponent(componentPath, targetElement) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`Failed to load component: ${componentPath}`);
    }
    const html = await response.text();
    targetElement.innerHTML = html;
    return true;
  } catch (error) {
    console.error(`Error loading component ${componentPath}:`, error);
    return false;
  }
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
  // Load sidebar
  const sidebarContainer = document.querySelector('[data-sidebar-container]');
  if (sidebarContainer) {
    await loadComponent('./components/sidebar.html', sidebarContainer);
  }

  // Load navbar
  const navbarContainer = document.querySelector('[data-navbar-container]');
  if (navbarContainer) {
    await loadComponent('./components/navbar.html', navbarContainer);
  }

  // Load about section
  const aboutContainer = document.querySelector('[data-about-container]');
  if (aboutContainer) {
    await loadComponent('./components/about.html', aboutContainer);
  }

  // Load resume section
  const resumeContainer = document.querySelector('[data-resume-container]');
  if (resumeContainer) {
    await loadComponent('./components/resume.html', resumeContainer);
  }

  // Load project section
  const projectContainer = document.querySelector('[data-project-container]');
  if (projectContainer) {
    await loadComponent('./components/project.html', projectContainer);
  }

  // Load certificate section
  const certificateContainer = document.querySelector('[data-certificate-container]');
  if (certificateContainer) {
    await loadComponent('./components/certificate.html', certificateContainer);
  }

  // Load contact section
  const contactContainer = document.querySelector('[data-contact-container]');
  if (contactContainer) {
    await loadComponent('./components/contact.html', contactContainer);
  }

  // Re-initialize scripts after components are loaded
  // This ensures all event listeners are properly attached
  if (typeof initializeScripts === 'function') {
    initializeScripts();
  }
});

