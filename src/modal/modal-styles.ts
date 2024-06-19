import { css } from 'lit';

export function getModalStyles() {
  return css`
    :host {
      --background-color: #fff;
      --primary-color: #486cd9;
      --hover-color: #6ebff2;
      --text-color: #333;
      --secondary-text-color: #888;
      --border-radius: 1rem;
      --box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
      --font-family: 'Degular-Semibold', Helvetica;
      --font-size: 1rem;
      --font-size-small: 0.875rem;
      --padding: 1rem;
    }

    :host {
      font-family: var(--font-family);
      font-size: var(--font-size);
      color: var(--text-color);
      letter-spacing: 0.05em;
    }

    .modal {
      z-index: 1000;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      opacity: 0;
      transition: opacity 1s ease-in-out;
      position: absolute;
    }

    .modal-visible {
      opacity: 1;
    }

    .modal-container {
      background-color: var(--background-color);
      border-radius: var(--border-radius);
      width: 20rem;
      box-shadow: var(--box-shadow);
    }

    .modal-hidden {
      display: none;
    }

    .modal-content {
      margin-top: var(--padding);
      padding: var(--padding);
    }

    .capture-eye-button-modal {
      position: absolute;
      top: var(--button-top, 0); /* Use CSS variables to set the position */
      left: var(--button-left, 0);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10001; /* Ensure it is above the modal */
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      border-radius: 100vw;
      opacity: 14;
    }

    hr.thin-hr {
      border: none;
      border-top: 1px solid #ccc;
      margin: 20px 0;
    }

    .section-title {
      color: var(--secondary-text-color);
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
      white-space: nowrap;
      overflow: hidden;
      display: inline-block;
      max-width: 100%;
      font-size: var(--font-size-small);
    }

    .headline {
      color: var(--secondary-text-color);
      margin-bottom: 1rem;
      font-family: 'Degular-Regular', Helvetica;
      font-weight: 400;
      font-size: var(--font-size-small);
    }

    .origins p {
      margin: 0;
      font-size: var(--font-size-small);
      color: var(--secondary-text-color);
    }

    .view-more-btn {
      display: inline-block;
      background-color: var(--primary-color);
      width: 100%;
      color: var(--background-color);
      font-size: var(--font-size-small);
      font-weight: 600;
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
