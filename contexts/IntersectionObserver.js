// components/IntersectionObserverProvider.js

import { createContext, useContext, useEffect, useRef, useState } from 'react';

// Create Context
const IntersectionObserverContext = createContext();

// Provider Component
export function IntersectionObserverProvider({ children }) {
  const [observedElements, setObservedElements] = useState({});
  const observerRef = useRef(null);

  // Initialize the Intersection Observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setObservedElements(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Adjust as needed
      }
    );

    return () => {
      // Clean up the observer on component unmount
      observerRef.current.disconnect();
    };
  }, []);

  // Function to observe an element
  const observeElement = (element) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  };

  // Function to stop observing an element
  const unobserveElement = (element) => {
    if (element && observerRef.current) {
      observerRef.current.unobserve(element);
    }
  };

  return (
    <IntersectionObserverContext.Provider
      value={{ observedElements, observeElement, unobserveElement }}
    >
      {children}
    </IntersectionObserverContext.Provider>
  );
}

// Custom Hook to track a single element by ID
export function useInView(id) {
  const { observedElements, observeElement, unobserveElement } = useContext(IntersectionObserverContext);
  
  useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      observeElement(element);
    }
    return () => {
      if (element) {
        unobserveElement(element);
      }
    };
  }, [id, observeElement, unobserveElement]);

  return observedElements[id] || false;
}

// New Custom Hook to get all elements currently in view
export function useElementsInView() {
  const { observedElements } = useContext(IntersectionObserverContext);
  
  // return Object.keys(observedElements).filter(id => observedElements[id]);
  return Object.keys(observedElements).filter(id => observedElements[id]);
}
