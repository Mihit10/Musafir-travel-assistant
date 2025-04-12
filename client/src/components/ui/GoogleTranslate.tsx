'use client';

import { useEffect, useState } from 'react';

export default function GoogleTranslate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Load the Google Translate script
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Translate
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          // Extended language list with Indian languages
          includedLanguages: 'en,hi,bn,ta,te,mr,gu,kn,ml,pa,fr,es,de,zh-CN,ja,ru,ar',
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
      
      // Apply custom styling after Google elements are loaded
      setTimeout(applyCustomStyling, 300);
    };

    setShow(true);
    
    // Attempt to re-apply styles on window resize (for reliability)
    window.addEventListener('resize', () => setTimeout(applyCustomStyling, 100));
    
    return () => {
      window.removeEventListener('resize', () => setTimeout(applyCustomStyling, 100));
    };
  }, []);

  // Function to apply custom styling to Google Translate elements
  const applyCustomStyling = () => {
    // Style the container
    const container = document.getElementById('google_translate_element');
    if (container) {
      // Remove extra padding that Google adds
      container.style.padding = '0';
      container.style.lineHeight = 'normal';
    }

    // Style the Google Translate widget
    const widget = document.querySelector('.goog-te-gadget') as HTMLElement;
    if (widget) {
      widget.style.color = 'transparent'; // Hide default text
      widget.style.fontSize = '0px'; // Reduce any extra spacing
      widget.style.margin = '0';
      widget.style.padding = '0';
      
      // Find and style the actual select element
      const selectBox = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectBox) {
        selectBox.style.border = '1px solid #ddd';
        selectBox.style.borderRadius = '8px';
        selectBox.style.padding = '8px 30px 8px 10px';
        selectBox.style.backgroundColor = '#fff';
        selectBox.style.color = '#333';
        selectBox.style.fontSize = '14px';
        selectBox.style.fontFamily = 'inherit';
        selectBox.style.width = '100%';
        selectBox.style.appearance = 'none'; // Remove default browser styling
        selectBox.style.backgroundImage = 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")';
        selectBox.style.backgroundRepeat = 'no-repeat';
        selectBox.style.backgroundPosition = 'right 10px top 50%';
        selectBox.style.backgroundSize = '10px auto';
        selectBox.style.cursor = 'pointer';
        selectBox.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        selectBox.style.margin = '0';
        selectBox.style.outline = 'none';
        
        // Change the "Select Language" text to be more readable
        if (selectBox.options[0]) {
          selectBox.options[0].text = 'Select Language';
        }
      }

      // Hide the Google attribution text and links
      const spans = widget.querySelectorAll('span');
      spans.forEach(span => {
        if (span.textContent?.includes('Powered by')) {
          span.style.display = 'none';
        }
      });
      
      // Hide any image (Google logo)
      const images = widget.querySelectorAll('img');
      images.forEach(img => {
        img.style.display = 'none';
      });
    }
  };

  if (!show) return null;

  return (
    <div
      id="google_translate_element"
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 10000,
        width: '180px',
        boxSizing: 'border-box',
        backgroundColor: 'transparent',
        borderRadius: '8px',
      }}
    />
  );
}