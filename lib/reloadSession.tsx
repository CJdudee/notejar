import React from 'react'

export default function reloadSession() {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
}
