const NOTIFICATION_CONTAINER_ID = 'notification-container';

const getNotificationContainer = () => {
  let container = document.getElementById(NOTIFICATION_CONTAINER_ID);
  
  if (!container) {
    container = document.createElement('div');
    container.id = NOTIFICATION_CONTAINER_ID;
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    
    document.body.appendChild(container);
  }
  
  return container;
};

export const showNotification = (message, type = 'info', duration = 3000) => {
  const container = getNotificationContainer();
  
  const notification = document.createElement('div');
  
  notification.setAttribute('role', 'alert');
  notification.className = `notification notification-${type}`;
  
  notification.style.cssText = `
    background-color: ${type === 'error' ? '#fee2e2' : type === 'success' ? '#d1fae5' : '#dbeafe'};
    color: ${type === 'error' ? '#dc2626' : type === 'success' ? '#059669' : '#2563eb'};
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 300px;
    max-width: 500px;
    animation: slideIn 0.3s ease-out;
  `;
  
  const textNode = document.createTextNode(message);
  notification.appendChild(textNode);
  
  container.appendChild(notification);
  
  setTimeout(() => {
    if (notification.parentNode) {
      container.removeChild(notification);
    }
  }, duration);
  
  return notification;
};

export const showSuccessNotification = (message) => showNotification(message, 'success');
export const showErrorNotification = (message) => showNotification(message, 'error');
export const showInfoNotification = (message) => showNotification(message, 'info');

