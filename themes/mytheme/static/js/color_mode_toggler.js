/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */
(() => {
    'use strict'
  
    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)
  
    const getPreferredTheme = () => {
      const storedTheme = getStoredTheme()
      if (storedTheme) {
        return storedTheme
      }
  
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  
    const setTheme = theme => {
      if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
      } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
      }
    }
  
    setTheme(getPreferredTheme())
  
    window.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-bs-theme-value]')
        .forEach(toggle => {
            console.log(toggle);
          toggle.addEventListener('click', () => {
            const storedTheme = getStoredTheme()
            console.log(storedTheme);
            const newTheme = storedTheme === 'light' ? 'dark' : 'light';
            setStoredTheme(newTheme)
            setTheme(newTheme)
          })
        })
    })
  })()