import { css } from 'lit';

export function getModalStyles() {
  return css`
    :host {
      --background-color: #fff;
      --primary-color: #486cd9;
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
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      opacity: 0;
      transform: scale(0.5);
      transform-origin: top left;
      transition: opacity 0.3s ease-in-out, transform 0.3s ease-in;
      position: absolute;
    }

    .modal-visible {
      opacity: 1;
      transform: scale(1);
    }

    .modal-container {
      background-color: var(--background-color);
      border-radius: var(--border-radius);
      width: 20rem;
      box-shadow: var(--box-shadow);
    }

    .modal-hidden {
      opacity: 0;
      transform: scale(0.5);
    }

    .modal-content {
      padding: 12px 24px 12px 24px;
    }

    .close-button {
      position: absolute;
      top: -1rem;
      left: -1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10001;
      width: 2rem;
      height: 2rem;
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

    .top-date {
      color: var(--secondary-text-color);
      font-family: var(--font-light);
      font-size: var(--font-size-very-small);
    }

    .headline {
      font-family: var(--font-light);
      color: var(--secondary-text-color);
      margin-bottom: 1rem;
      font-size: var(--font-size-small);
    }

    .middle-row {
      flex-flow: wrap;
      align-items: center;
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
      display: flex;
    }

    .middle-text {
      margin-left: 10px;
    }

    a.link-text,
    a.link-text:link,
    a.link-text:visited {
      color: var(--primary-color);
      text-decoration: none;
      margin-left: 0.4rem;
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

    .full-width-img {
      width: 100%;
      display: block;
      border-bottom-left-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
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
