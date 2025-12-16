import React, { useState, useRef, useCallback, useEffect } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { ArrowUpLeft } from 'lucide-react';

interface ResizableMiniPlayerProps {
  videoSrc: string;
  onCourseDetailsClick: () => void;
  isVisible: boolean;
  onClose: () => void;
  onScrollToVideo?: () => void;
}

export function ResizableMiniPlayer({ 
  videoSrc, 
  onCourseDetailsClick, 
  isVisible, 
  onClose,
  onScrollToVideo
}: ResizableMiniPlayerProps) {
  const [size, setSize] = useState({ width: 320, height: 180 });
  const [position, setPosition] = useState(() => {
    const defaultWidth = 320;
    const defaultHeight = 180;
    return {
      x: window.innerWidth - defaultWidth - 20,
      y: window.innerHeight - defaultHeight - 20
    };
  });
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setResizeDirection(direction);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialSize({ ...size });
    setInitialPosition({ ...position });
  }, [size, position]);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if (isResizing) return;
    
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [position, isResizing]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      const aspectRatio = 16 / 9;
      
      let newWidth = initialSize.width;
      let newHeight = initialSize.height;
      let newX = initialPosition.x;
      let newY = initialPosition.y;

      // Handle horizontal resizing
      if (resizeDirection.includes('right')) {
        newWidth = Math.max(240, initialSize.width + deltaX);
        newHeight = newWidth / aspectRatio;
      }
      if (resizeDirection.includes('left')) {
        newWidth = Math.max(240, initialSize.width - deltaX);
        newHeight = newWidth / aspectRatio;
        newX = initialPosition.x + (initialSize.width - newWidth);
      }
      
      // Handle vertical resizing
      if (resizeDirection.includes('bottom')) {
        newHeight = Math.max(135, initialSize.height + deltaY);
        newWidth = newHeight * aspectRatio;
      }
      if (resizeDirection.includes('top')) {
        newHeight = Math.max(135, initialSize.height - deltaY);
        newWidth = newHeight * aspectRatio;
        newY = initialPosition.y + (initialSize.height - newHeight);
      }

      // Keep within screen bounds
      newX = Math.max(0, Math.min(window.innerWidth - newWidth, newX));
      newY = Math.max(0, Math.min(window.innerHeight - newHeight, newY));
      
      // Adjust size if position was clamped
      if (newX === 0) newWidth = Math.min(newWidth, window.innerWidth);
      if (newY === 0) newHeight = Math.min(newHeight, window.innerHeight);

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    } else if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragStart.x));
      const newY = Math.max(0, Math.min(window.innerHeight - size.height, e.clientY - dragStart.y));
      setPosition({ x: newX, y: newY });
    }
  }, [isResizing, isDragging, dragStart, initialSize, initialPosition, resizeDirection, size]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setIsDragging(false);
    setResizeDirection('');
  }, []);

  useEffect(() => {
    if (isResizing || isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isResizing ? 
        (resizeDirection.includes('right') || resizeDirection.includes('left') ? 'ew-resize' : 
         resizeDirection.includes('top') || resizeDirection.includes('bottom') ? 'ns-resize' : 
         'nwse-resize') : 'move';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'default';
      };
    }
  }, [isResizing, isDragging, handleMouseMove, handleMouseUp, resizeDirection]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed z-50 bg-black rounded-lg shadow-2xl overflow-hidden"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
    >
      {/* Navigation arrow */}
      <button
        onClick={() => {
          onScrollToVideo?.();
          onClose();
        }}
        className="absolute top-2 left-2 z-10 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"
      >
        <ArrowUpLeft className="w-3 h-3" />
      </button>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 z-10 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-sm"
      >
        ×
      </button>

      {/* Drag handle */}
      <div
        className="absolute inset-0 cursor-move"
        onMouseDown={handleDragStart}
      >
        <VideoPlayer
          videoSrc={videoSrc}
          onCourseDetailsClick={onCourseDetailsClick}
          isMiniPlayer={true}
        />
      </div>

      {/* Resize handles - Only vertical */}
      {/* Top edge */}
      <div
        className="absolute top-0 left-1 right-1 h-1 cursor-ns-resize"
        onMouseDown={(e) => handleMouseDown(e, 'top')}
      />
      
      {/* Bottom edge */}
      <div
        className="absolute bottom-0 left-1 right-1 h-1 cursor-ns-resize"
        onMouseDown={(e) => handleMouseDown(e, 'bottom')}
      />
    </div>
  );
}