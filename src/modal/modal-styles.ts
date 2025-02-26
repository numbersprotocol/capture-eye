import { css } from 'lit';

export function getModalStyles() {
  return css`
    :host {
      --background-color: #fff;
      --primary-color: #027fe5;
      --hover-color: #6ebff2;
      --text-color: #000;
      --secondary-text-color: #333;
      --border-radius: 1rem;
      --box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
      --font-semibold: 'Degular-Semibold', Helvetica;
      --font-regular: 'Degular-Regular', Helvetica;
      --font-light: 'Degular-Light', Helvetica;
      --font-size: 1rem;
      --font-size-small: 0.875rem;
      --font-size-very-small: 0.7rem;
      --padding: 1rem;
    }

    :host {
      font-family: var(--font-light);
      font-size: var(--font-size);
      color: var(--text-color);
    }

    .modal {
      z-index: 1000;
      justify-content: flex-start;
      align-items: flex-start;
      display: none;
      position: absolute;
    }

    .modal-visible {
      display: flex;
    }

    .modal-hidden {
      display: none;
    }

    .modal-container {
      background-color: var(--background-color);
      border-radius: var(--border-radius);
      width: 20rem;
      box-shadow: var(--box-shadow);
      opacity: 0;
      transform: scale(0.5);
      transition: opacity 0.3s ease-in-out, transform 0.3s ease-in;
      transition-behavior: allow-discrete;
    }

    .modal-visible .modal-container {
      opacity: 1;
      transform: scale(1);
    }

    .modal-hidden .modal-container {
      opacity: 0;
      transform: scale(0.5);
    }

    @starting-style {
      .modal.modal-visible .modal-container {
        opacity: 0;
        transform: scale(0.5);
      }
    }

    .modal-content {
      padding: 12px 24px 12px 24px;
    }

    .close-button {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10001;
      cursor: pointer;
      border-radius: 100vw;
      opacity: 0;
      transform: scale(0.5) rotate(0deg);
      transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }

    .close-button-visible {
      opacity: 1;
      transform: scale(1) rotate(90deg);
    }

    .close-button-hidden {
      opacity: 0;
      transform: scale(0.5) rotate(-90deg);
    }

    @starting-style {
      .close-button {
        opacity: 0;
        transform: scale(0.5) rotate(0deg);
      }
    }

    .close-button img {
      width: 100%;
    }

    .section {
      border-bottom: 1px solid #e2e2e2;
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
    }

    .section:last-child {
      border-bottom: none;
    }

    .section-title {
      font-family: var(--font-light);
      color: var(--text-color);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding-top: 10px;
      padding-bottom: 5px;
      font-size: 0.75rem;
      font-weight: 400;
      line-height: 2;
      display: block;
    }

    .badge-container {
      display: flex;
      position: absolute;
      top: 16px;
      right: 24px;
      gap: 4px;
    }

    .badge-container div,
    .badge-container img {
      position: relative;
      width: 32px;
      height: 32px;
      display: block;
    }

    .button-content-credentials {
      cursor: pointer;
    }

    .button-content-credentials svg {
      width: 100%;
      height: 100%;
    }

    .profile-container {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .profile-img {
      border-radius: 0.5rem;
      width: 4rem;
      height: 4rem;
      margin-right: 1rem;
    }

    .profile-text {
      display: flex;
      flex-direction: column;
    }

    .top-name {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .top-info {
      color: var(--secondary-text-color);
      font-family: var(--font-light);
      font-size: var(--font-size-very-small);
    }

    .heading {
      font-family: var(--font-light);
      color: var(--secondary-text-color);
      margin-bottom: 1rem;
      font-size: var(--font-size-small);
      overflow: hidden;
      max-height: 100px;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
    }

    .heading.expand {
      max-height: none;
      -webkit-line-clamp: none;
    }

    .middle-row {
      flex-flow: wrap;
      align-items: center;
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
      display: flex;
    }

    .field-text {
      margin-left: 10px;
    }

    .value-text {
      margin-left: 1ch;
    }

    a.link-text,
    a.link-text:link,
    a.link-text:visited {
      color: var(--primary-color);
      text-decoration: none;
    }

    a.link-text:hover {
      color: var(--hover-color);
    }

    .view-more-btn {
      font-family: var(--font-light);
      font-size: var(--font-size-small);
      color: var(--background-color);
      display: inline-block;
      background-color: var(--primary-color);
      width: 100%;
      text-transform: uppercase;
      padding: 0.5rem 2rem;
      border-radius: 100vw;
      text-align: center;
      transition: background-color 0.3s ease;
      border: none;
      cursor: pointer;
      margin-top: 1rem;
    }

    .view-more-btn:hover {
      background-color: var(--hover-color);
    }

    .powered-by {
      text-align: right;
      color: var(--secondary-text-color);
      font-size: var(--font-size-small);
      margin-top: 0.5rem;
    }

    .powered-by a,
    .powered-by a:visited {
      text-decoration: none;
      color: var(--secondary-text-color);
    }

    .slideshow-container {
      position: relative;
      width: 320px;
      height: 120px;
    }
    .eng-img {
      width: 320px;
      height: 120px;
      display: block;
      object-fit: contain;
      border-bottom-left-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
      background-color: #eee;
    }
    .prev,
    .next {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 30px; /* Make the buttons thinner */
      background-color: rgba(0, 0, 0, 0); /* Semi-transparent background */
      color: white;
      border: none;
      padding: 0;
      cursor: pointer;
      font-size: 18px;
      user-select: none;
      opacity: 0;
    }
    .prev {
      left: 0;
      border-bottom-left-radius: var(--border-radius);
    }
    .next {
      right: 0;
      border-bottom-right-radius: var(--border-radius);
    }
    .prev:hover,
    .next:hover {
      background-color: rgba(0, 0, 0, 0.3); /* Darker background on hover */
      opacity: 1;
    }

    /* Shimmer effect */
    .shimmer {
      display: inline-block;
      height: 200px;
      width: 100%;
      background: linear-gradient(
        to right,
        #eeeeee 0%,
        #dddddd 20%,
        #eeeeee 40%,
        #eeeeee 100%
      );
      background-size: 200% auto;
      animation: shimmer 1.5s infinite linear;
    }

    .shimmer-text {
      display: inline-block;
      height: 1rem;
      width: 100%;
      background: linear-gradient(
        to right,
        #eeeeee 0%,
        #dddddd 20%,
        #eeeeee 40%,
        #eeeeee 100%
      );
      background-size: 200% auto;
      animation: shimmer 1.5s infinite linear;
    }

    .shimmer-profile-img {
      display: inline-block;
      background: linear-gradient(
        to right,
        #eeeeee 0%,
        #dddddd 20%,
        #eeeeee 40%,
        #eeeeee 100%
      );
      background-size: 200% auto;
      animation: shimmer 1.5s infinite linear;
      border-radius: 0.5rem;
      width: 4rem;
      height: 4rem;
      margin-right: 1rem;
      margin-bottom: 0.375rem;
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `;
}
