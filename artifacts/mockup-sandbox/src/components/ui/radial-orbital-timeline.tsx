"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Link, Zap, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface OrbitalNode {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  color: string;
}

interface RadialOrbitalTimelineProps {
  nodes: OrbitalNode[];
  centerLabel?: string;
  centerColor?: string;
  autoRotate?: boolean;
  className?: string;
  onNodeSelect?: (id: number | null) => void;
}

export function RadialOrbitalTimeline({
  nodes,
  centerLabel = "NORI",
  centerColor = "#8a5cf6",
  autoRotate: autoRotateProp = true,
  className = "",
}: RadialOrbitalTimelineProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(autoRotateProp);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const rafRef = useRef<number>(0);
  const angleRef = useRef<number>(0);

  const totalNodes = nodes.length;

  // Smooth auto-rotation using requestAnimationFrame
  useEffect(() => {
    if (!autoRotate) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      // 0.15 deg per frame at 60fps = ~9 deg/sec
      angleRef.current = (angleRef.current + delta * 0.015) % 360;
      setRotationAngle(angleRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [autoRotate]);

  const handleContainerClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedId(null);
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(autoRotateProp);
    }
  }, [autoRotateProp]);

  const toggleItem = useCallback((id: number) => {
    setExpandedId((prev) => {
      const isExpanding = prev !== id;
      if (isExpanding) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const node = nodes.find((n) => n.id === id);
        const newPulse: Record<number, boolean> = {};
        node?.relatedIds.forEach((relId) => {
          newPulse[relId] = true;
        });
        setPulseEffect(newPulse);
        // Center the view on this node
        const idx = nodes.findIndex((n) => n.id === id);
        const targetAngle = 270 - (idx / totalNodes) * 360;
        angleRef.current = targetAngle;
        setRotationAngle(targetAngle);
      } else {
        setActiveNodeId(null);
        setAutoRotate(autoRotateProp);
        setPulseEffect({});
      }
      return isExpanding ? id : null;
    });
  }, [nodes, totalNodes, autoRotateProp]);

  // Eye-level orbit: nodes arranged in a horizontal ellipse (frontal view)
  // X = horizontal spread, Y = vertical (depth), Z = simulated depth for scale/opacity
  const calculateNodePosition = (index: number, total: number) => {
    const angleDeg = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angleDeg * Math.PI) / 180;

    // Eye-level orbit: horizontal radius larger, vertical smaller (ellipse)
    const radiusX = 260; // horizontal spread
    const radiusY = 80;  // vertical depth (smaller = flatter, more eye-level)

    const x = radiusX * Math.cos(radian);
    const y = radiusY * Math.sin(radian); // vertical position (depth in 2D)

    // Simulated Z-depth for scale and opacity
    // When sin(radian) is negative, node is "closer" (front)
    // When positive, node is "further" (back)
    const zDepth = -Math.sin(radian); // -1 (front) to 1 (back)
    const scale = 0.75 + 0.35 * ((1 - zDepth) / 2); // 0.75 (back) to 1.1 (front)
    const opacity = 0.45 + 0.65 * ((1 - zDepth) / 2); // 0.45 (back) to 1.0 (front)
    const zIndex = Math.round(100 + 80 * (1 - zDepth)); // front nodes on top
    const blur = zDepth > 0.3 ? Math.round(zDepth * 4) : 0; // blur back nodes

    return { x, y, scale, opacity, zIndex, blur, angleDeg, zDepth };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = nodes.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: OrbitalNode["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className={`relative w-full h-[520px] md:h-[600px] flex items-center justify-center overflow-hidden ${className}`}
      ref={containerRef}
      onClick={handleContainerClick}
      style={{ perspective: "1200px" }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, ${centerColor}20 0%, transparent 60%)`,
        }}
      />

      {/* Orbit container with eye-level tilt */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        ref={orbitRef}
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(15deg)", // Eye-level tilt - slight downward angle
        }}
      >
        {/* Center hub */}
        <div className="absolute z-10 flex flex-col items-center justify-center">
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center relative"
            style={{
              background: `linear-gradient(135deg, ${centerColor}, ${centerColor}99)`,
              boxShadow: `0 0 40px -8px ${centerColor}80, 0 0 80px -20px ${centerColor}40`,
            }}
          >
            {/* Pulse rings */}
            <div
              className="absolute inset-0 rounded-full border border-white/20 animate-ping"
              style={{ animationDuration: "2s" }}
            />
            <div
              className="absolute -inset-2 rounded-full border border-white/10"
              style={{ animationDuration: "3s", animationDelay: "0.5s" }}
            />
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/80 backdrop-blur-md" />
          </div>
          <span className="mt-2 text-[10px] md:text-xs font-medium tracking-widest uppercase text-[var(--muted)]">
            {centerLabel}
          </span>
        </div>

        {/* Orbit ring - horizontal ellipse */}
        <div
          className="absolute rounded-full border border-white/10 pointer-events-none"
          style={{
            width: 520,
            height: 160,
            transform: "rotateX(60deg)",
          }}
        />
        <div
          className="absolute rounded-full border border-white/5 pointer-events-none"
          style={{
            width: 640,
            height: 200,
            transform: "rotateX(60deg)",
          }}
        />

        {/* Orbital nodes */}
        {nodes.map((item, index) => {
          const pos = calculateNodePosition(index, totalNodes);
          const isExpanded = expandedId === item.id;
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = pulseEffect[item.id];
          const isHovered = hoveredNodeId === item.id;
          const Icon = item.icon;

          const nodeStyle: React.CSSProperties = {
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`,
            zIndex: isExpanded ? 300 : pos.zIndex,
            opacity: isExpanded ? 1 : pos.opacity,
            filter: isExpanded ? "none" : `blur(${pos.blur}px)`,
            transition: isExpanded
              ? "transform 0.5s cubic-bezier(.2,.7,.2,1), opacity 0.3s"
              : "transform 0.1s linear, opacity 0.1s linear",
          };

          return (
            <div
              key={item.id}
              ref={(el) => { nodeRefs.current[item.id] = el; }}
              className="absolute cursor-pointer"
              style={nodeStyle}
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(item.id);
              }}
              onMouseEnter={() => setHoveredNodeId(item.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
            >
              {/* Energy glow */}
              <div
                className={`absolute rounded-full -inset-2 transition-opacity duration-500 ${
                  isPulsing ? "animate-pulse" : ""
                }`}
                style={{
                  background: `radial-gradient(circle, ${item.color}30 0%, transparent 70%)`,
                  width: `${item.energy * 0.6 + 48}px`,
                  height: `${item.energy * 0.6 + 48}px`,
                  left: `-${(item.energy * 0.6 + 48 - 40) / 2 + 8}px`,
                  top: `-${(item.energy * 0.6 + 48 - 40) / 2 + 8}px`,
                  opacity: isHovered || isExpanded ? 1 : 0.6,
                }}
              />

              {/* Node circle */}
              <div
                className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isExpanded
                    ? "bg-white text-black border-white shadow-lg"
                    : isRelated
                    ? "bg-white/60 text-black border-white animate-pulse"
                    : "bg-white/20 text-[var(--ink)] border-white/30"
                } ${isHovered && !isExpanded ? "scale-125 bg-white/40" : ""} ${
                  isExpanded ? "scale-150" : ""
                }`}
                style={{
                  boxShadow: isExpanded
                    ? `0 0 30px -5px ${item.color}60`
                    : isHovered
                    ? `0 0 20px -5px ${item.color}40`
                    : "none",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Icon size={isExpanded ? 20 : 16} />
              </div>

              {/* Label */}
              <div
                className={`absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] md:text-xs font-semibold tracking-wider transition-all duration-300 ${
                  isExpanded ? "text-[var(--ink)] scale-110" : "text-[var(--muted)]"
                }`}
              >
                {item.title}
              </div>

              {/* Expanded card */}
              {isExpanded && (
                <Card
                  className="absolute top-20 left-1/2 -translate-x-1/2 w-64 md:w-72 bg-white/80 backdrop-blur-xl border-white/40 shadow-2xl overflow-visible"
                  style={{ zIndex: 400 }}
                >
                  {/* Connector line */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[var(--line)]" />

                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <Badge
                        className={`px-2 text-[10px] ${getStatusStyles(item.status)}`}
                      >
                        {item.status === "completed"
                          ? "LIVE"
                          : item.status === "in-progress"
                          ? "BETA"
                          : "COMING SOON"}
                      </Badge>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItem(item.id);
                        }}
                        className="p-1 rounded-full hover:bg-black/10 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <CardTitle className="text-sm mt-2">{item.title}</CardTitle>
                    <p className="text-[10px] text-[var(--muted)]">{item.subtitle}</p>
                  </CardHeader>
                  <CardContent className="text-xs text-[var(--muted)]">
                    <p>{item.content}</p>

                    {/* Energy bar */}
                    <div className="mt-4 pt-3 border-t border-[var(--line)]">
                      <div className="flex justify-between items-center text-[10px] mb-1">
                        <span className="flex items-center gap-1">
                          <Zap size={10} />
                          Power
                        </span>
                        <span className="font-mono">{item.energy}%</span>
                      </div>
                      <div className="w-full h-1 bg-[var(--line)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${item.energy}%`,
                            background: `linear-gradient(90deg, ${item.color}, ${centerColor})`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Related nodes */}
                    {item.relatedIds.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-[var(--line)]">
                        <div className="flex items-center gap-1 mb-2">
                          <Link size={10} className="text-[var(--muted)]" />
                          <h4 className="text-[10px] uppercase tracking-wider font-medium text-[var(--muted)]">
                            Connected
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.relatedIds.map((relatedId) => {
                            const relatedItem = nodes.find((n) => n.id === relatedId);
                            return (
                              <Button
                                key={relatedId}
                                variant="outline"
                                size="sm"
                                className="flex items-center h-6 px-2 py-0 text-[10px] rounded-full border-[var(--line)] bg-white/50 hover:bg-white/80 text-[var(--muted)] hover:text-[var(--ink)] transition-all"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleItem(relatedId);
                                }}
                              >
                                {relatedItem?.title}
                                <ArrowRight size={8} className="ml-1 text-[var(--muted)]" />
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RadialOrbitalTimeline;
