import React, { useEffect } from 'react';
import { injectStyle } from './helpers';

export function useAnimations() {
	const bounceInKeyframes = `
    @keyframes bounceIn {
      0% {
        opacity: 0;
        transform: translateY(-100%) scale(0.3);
      }
      50% {
        opacity: 1;
        transform: translateY(0) scale(1.1);
      }
      70% {
        transform: translateY(-10%) scale(0.95);
      }
      100% {
        transform: translateY(0) scale(1);
      }
    }
  `;

	const fadeInKeyframes = `
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `;

	const slideFromLeftKeyframes = `
    @keyframes slideFromLeft {
      0% {
        opacity: 0;
        transform: translateX(-100%);
      }
      80% {
        transform: translateX(5%);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `;

	const slideFromRightKeyframes = `
    @keyframes slideFromRight {
      0% {
        opacity: 0;
        transform: translateX(100%);
      }
      80% {
        transform: translateX(-5%);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `;

	const slideFromTopKeyframes = `
    @keyframes slideFromTop {
      0% {
        opacity: 0;
        transform: translateY(-100%);
      }
      80% {
        transform: translateY(5%);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

	const slideFromBottomKeyframes = `
    @keyframes slideFromBottom {
      0% {
        opacity: 0;
        transform: translateY(100%);
      }
      80% {
        transform: translateY(-5%);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

	useEffect(() => {
		const allStyles =
			bounceInKeyframes +
			fadeInKeyframes +
			slideFromLeftKeyframes +
			slideFromRightKeyframes +
			slideFromTopKeyframes +
			slideFromBottomKeyframes;
		injectStyle('poptart-animations', allStyles);
	}, []);
}
