/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line react/prop-types
import { useState } from 'react';
import { useEffect } from 'react';

const Controls = ({
  menuItems,
  selectedMenuItem,
  setSelectedMenuItem,
  setOpenMenuItem,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startAngle, setStartAngle] = useState(0);
  const [currentAngle, setCurrentAngle] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isDragging) return;
      const { clientX, clientY } = event;
      const { top, left, width, height } = event.target.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const currentX = clientX - centerX;
      const currentY = clientY - centerY;
      const angle = Math.atan2(currentY, currentX);
      setCurrentAngle(angle);
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
    setStartX(event.clientX);
    setStartY(event.clientY);
    setStartAngle(Math.atan2(event.clientY, event.clientX));
  };

  useEffect(() => {
    if (!isDragging) return;

    const angleChange = currentAngle - startAngle;
    const angleIncrement = (2 * Math.PI) / menuItems.length;

    let selectedItemIndex;

    if (angleChange > 0) {
      // Clockwise direction
      selectedItemIndex = Math.round(
        (angleChange % (2 * Math.PI)) / angleIncrement
      );
    } else {
      // Anticlockwise direction
      selectedItemIndex =
        menuItems.length -
        Math.round((-angleChange % (2 * Math.PI)) / angleIncrement);
    }

    setSelectedMenuItem(menuItems[selectedItemIndex % menuItems.length]);
  }, [currentAngle, startAngle, isDragging, menuItems, setSelectedMenuItem]);
  const handleCenterButton = () => {
    setOpenMenuItem(selectedMenuItem);
  };
  const handleMenuButton = () => {
    setOpenMenuItem('');
    setSelectedMenuItem('');
  };
  return (
    <div id='ipod-controls' onMouseDown={handleMouseDown}>
      <button id='ipod-center_button' onClick={handleCenterButton}></button>
      <button className='ipod-ring_button ipod-ring_menu'>
        <p className='ipod-ring_content' onClick={handleMenuButton}>
          Menu
        </p>
      </button>
      <button className='ipod-ring_button ipod-ring_forward'>
        <i className='fa-solid fa-backward-fast ipod-ring_content'></i>
      </button>
      <button className='ipod-ring_button ipod-ring_backward'>
        <i className='fa-solid fa-forward-fast ipod-ring_content'></i>
      </button>
      <button className='ipod-ring_button ipod-ring_play'>
        <i className='fa-solid fa-play ipod-ring_content'></i>
        <i className='fa-solid fa-pause ipod-ring_content'></i>
      </button>
    </div>
  );
};
export default Controls;
