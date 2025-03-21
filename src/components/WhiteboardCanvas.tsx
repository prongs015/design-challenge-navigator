
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenLine, Type, Square, StickyNote, Download, Undo, Eraser, Trash2 } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface DrawingElement {
  type: 'sketch' | 'text' | 'shape' | 'sticky';
  points?: Point[];
  text?: string;
  position?: { x: number; y: number };
  width?: number;
  height?: number;
  color?: string;
}

const WhiteboardCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [history, setHistory] = useState<DrawingElement[][]>([]);
  const [currentElement, setCurrentElement] = useState<DrawingElement | null>(null);
  const [tool, setTool] = useState<'sketch' | 'text' | 'shape' | 'sticky' | 'eraser'>('sketch');
  const [textInput, setTextInput] = useState('');
  const [textPosition, setTextPosition] = useState<Point | null>(null);
  const [activeTab, setActiveTab] = useState('problem');

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#000';
      setContext(ctx);
    }
    
    // Set canvas dimensions to match parent container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        redrawCanvas();
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Redraw all elements on canvas
  const redrawCanvas = () => {
    if (!context || !canvasRef.current) return;
    
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    elements.forEach(element => {
      if (element.type === 'sketch' && element.points && element.points.length > 1) {
        context.beginPath();
        context.moveTo(element.points[0].x, element.points[0].y);
        
        for (let i = 1; i < element.points.length; i++) {
          context.lineTo(element.points[i].x, element.points[i].y);
        }
        
        context.stroke();
      } else if (element.type === 'text' && element.text && element.position) {
        context.font = '16px sans-serif';
        context.fillText(element.text, element.position.x, element.position.y);
      } else if (element.type === 'shape' && element.position && element.width && element.height) {
        context.strokeRect(element.position.x, element.position.y, element.width, element.height);
      } else if (element.type === 'sticky' && element.position && element.text) {
        // Draw sticky note background
        context.fillStyle = element.color || '#FFEB3B';
        context.fillRect(element.position.x, element.position.y, 150, 150);
        context.strokeRect(element.position.x, element.position.y, 150, 150);
        
        // Draw text on sticky note
        context.fillStyle = '#000';
        context.font = '14px sans-serif';
        
        const words = element.text.split(' ');
        let line = '';
        let lineHeight = 20;
        let yPos = element.position.y + 20;
        
        words.forEach(word => {
          const testLine = line + word + ' ';
          const metrics = context.measureText(testLine);
          const testWidth = metrics.width;
          
          if (testWidth > 130 && line !== '') {
            context.fillText(line, element.position.x + 10, yPos);
            line = word + ' ';
            yPos += lineHeight;
          } else {
            line = testLine;
          }
        });
        
        context.fillText(line, element.position.x + 10, yPos);
        
        // Reset fill style
        context.fillStyle = '#000';
      }
    });
  };

  useEffect(() => {
    redrawCanvas();
  }, [elements]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (tool === 'text') {
      setTextPosition({ x, y });
      return;
    }
    
    if (tool === 'sticky') {
      const newSticky: DrawingElement = {
        type: 'sticky',
        position: { x, y },
        text: 'New sticky note',
        color: '#FFEB3B'
      };
      
      setElements(prev => [...prev, newSticky]);
      setHistory(prev => [...prev, elements]);
      return;
    }
    
    if (tool === 'shape') {
      const newShape: DrawingElement = {
        type: 'shape',
        position: { x, y },
        width: 0,
        height: 0
      };
      
      setCurrentElement(newShape);
      setIsDrawing(true);
      return;
    }
    
    if (tool === 'sketch' || tool === 'eraser') {
      const newElement: DrawingElement = {
        type: 'sketch',
        points: [{ x, y }]
      };
      
      setCurrentElement(newElement);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentElement || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (tool === 'shape') {
      if (currentElement.position) {
        const newElement = { ...currentElement };
        newElement.width = x - currentElement.position.x;
        newElement.height = y - currentElement.position.y;
        setCurrentElement(newElement);
        redrawCanvas();
        
        if (context) {
          context.strokeRect(
            currentElement.position.x,
            currentElement.position.y,
            newElement.width,
            newElement.height
          );
        }
      }
      return;
    }
    
    if ((tool === 'sketch' || tool === 'eraser') && currentElement.points) {
      if (context) {
        // Temporarily set eraser settings
        const originalStrokeStyle = context.strokeStyle;
        const originalLineWidth = context.lineWidth;
        
        if (tool === 'eraser') {
          context.strokeStyle = '#fff';
          context.lineWidth = 10;
        }
        
        // Draw line from last point to current point
        context.beginPath();
        const lastPoint = currentElement.points[currentElement.points.length - 1];
        context.moveTo(lastPoint.x, lastPoint.y);
        context.lineTo(x, y);
        context.stroke();
        
        // Restore original settings
        if (tool === 'eraser') {
          context.strokeStyle = originalStrokeStyle;
          context.lineWidth = originalLineWidth;
        }
      }
      
      // Add point to current element
      setCurrentElement(prev => {
        if (prev && prev.points) {
          return {
            ...prev,
            points: [...prev.points, { x, y }]
          };
        }
        return prev;
      });
    }
  };

  const finishDrawing = () => {
    if (!isDrawing || !currentElement) return;
    
    setIsDrawing(false);
    setElements(prev => [...prev, currentElement]);
    setHistory(prev => [...prev, elements]);
    setCurrentElement(null);
  };

  const handleTextSubmit = () => {
    if (!textPosition || !textInput.trim()) return;
    
    const newTextElement: DrawingElement = {
      type: 'text',
      text: textInput,
      position: textPosition
    };
    
    setElements(prev => [...prev, newTextElement]);
    setHistory(prev => [...prev, elements]);
    setTextInput('');
    setTextPosition(null);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    
    const previousElements = history[history.length - 1];
    setElements(previousElements);
    setHistory(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setHistory(prev => [...prev, elements]);
    setElements([]);
  };

  const handleExport = () => {
    if (!canvasRef.current) return;
    
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    
    link.href = dataUrl;
    link.download = `whiteboard-${new Date().toISOString()}.png`;
    link.click();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 p-2 bg-gray-100 rounded-md">
        <div className="flex space-x-2">
          <Button
            variant={tool === 'sketch' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTool('sketch')}
          >
            <PenLine className="w-4 h-4 mr-1" />
            Draw
          </Button>
          <Button
            variant={tool === 'text' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTool('text')}
          >
            <Type className="w-4 h-4 mr-1" />
            Text
          </Button>
          <Button
            variant={tool === 'shape' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTool('shape')}
          >
            <Square className="w-4 h-4 mr-1" />
            Shape
          </Button>
          <Button
            variant={tool === 'sticky' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTool('sticky')}
          >
            <StickyNote className="w-4 h-4 mr-1" />
            Sticky
          </Button>
          <Button
            variant={tool === 'eraser' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTool('eraser')}
          >
            <Eraser className="w-4 h-4 mr-1" />
            Eraser
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleUndo}>
            <Undo className="w-4 h-4 mr-1" />
            Undo
          </Button>
          <Button variant="outline" size="sm" onClick={handleClear}>
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList>
          <TabsTrigger value="problem">Problem Understanding</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="wireframing">Wireframing</TabsTrigger>
          <TabsTrigger value="solution">Solution Rationale</TabsTrigger>
        </TabsList>
        
        <TabsContent value="problem" className="p-2 border rounded-md">
          <p className="text-sm text-gray-500 mb-2">
            Define the problem and identify key user needs and business goals.
          </p>
        </TabsContent>
        
        <TabsContent value="research" className="p-2 border rounded-md">
          <p className="text-sm text-gray-500 mb-2">
            Outline your research approach. Consider user personas, use cases, and competitive analysis.
          </p>
        </TabsContent>
        
        <TabsContent value="wireframing" className="p-2 border rounded-md">
          <p className="text-sm text-gray-500 mb-2">
            Sketch your solution. Focus on information architecture and key user flows.
          </p>
        </TabsContent>
        
        <TabsContent value="solution" className="p-2 border rounded-md">
          <p className="text-sm text-gray-500 mb-2">
            Explain your solution and how it addresses the problem. Consider tradeoffs and next steps.
          </p>
        </TabsContent>
      </Tabs>
      
      <div className="relative flex-grow border border-gray-200 rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={finishDrawing}
          onMouseLeave={finishDrawing}
        />
        
        {textPosition && (
          <div
            className="absolute bg-white p-2 border rounded-md shadow-sm"
            style={{ left: textPosition.x, top: textPosition.y }}
          >
            <Textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="min-h-[100px] min-w-[200px]"
              placeholder="Enter text here..."
            />
            <div className="flex justify-end space-x-2 mt-2">
              <Button variant="outline" size="sm" onClick={() => setTextPosition(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleTextSubmit}>
                Add Text
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhiteboardCanvas;
