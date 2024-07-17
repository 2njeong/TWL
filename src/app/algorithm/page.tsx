'use client';

import { BALLSIZE, MINDIFFERENCE, tree_balls } from '@/constants/algorithmConstants';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { useFetchAlgorithm } from '@/query/useQueries/useAlgorithmQuery';
import BallBtn from '@/components/algorithm/BallBtn';
import { Ball } from '@/type/memberType';

const AlgorithmPage = () => {
  const { data: balls, isLoading } = useFetchAlgorithm();
  const [apples, setApples] = useState<{ appleX: number; appleY: number }[]>([]);
  const [userOpenArr, setUserOpenArr] = useState<boolean[] | null>(null);
  const treeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLoading && balls) {
      setUserOpenArr(Array.from({ length: balls.length }, () => false));
    }
  }, [isLoading, balls]);

  const handleUserOpenArr = useCallback(
    (idx: number) => {
      if (userOpenArr && userOpenArr?.filter((item, i) => i !== idx && item).length > 0) return;
      setUserOpenArr((prev) => {
        if (prev === null) return null;
        return prev?.map((item, i) => (i === idx ? !item : item));
      });
    },
    [userOpenArr]
  );

  const getRandomInt = (min: number, max: number) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  };

  const generateRandomPointInPolygon = useCallback((points: { x: number; y: number }[]) => {
    const minX = Math.min(...points.map((p) => p.x));
    const maxX = Math.max(...points.map((p) => p.x));
    const minY = Math.min(...points.map((p) => p.y));
    const maxY = Math.max(...points.map((p) => p.y));

    let x, y;

    const isPointInPolygon = (x: number, y: number) => {
      let inside = false;
      for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const xi = points[i].x,
          yi = points[i].y;
        const xj = points[j].x,
          yj = points[j].y;
        const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }
      return inside;
    };

    do {
      x = getRandomInt(minX, maxX);
      y = getRandomInt(minY, maxY);
    } while (!isPointInPolygon(x, y));

    return { x, y };
  }, []);

  const getRandomAppleXYArr = useCallback(
    (points: { x: number; y: number }[], balls: Ball[]) => {
      const appleXYArr: { appleX: number; appleY: number }[] = [];

      if (balls) {
        while (appleXYArr.length < balls.length) {
          let { x: appleX, y: appleY } = generateRandomPointInPolygon(points);
          let appleXY = { appleX, appleY };
          const isTooClose = appleXYArr.some(
            (appleXY) =>
              Math.abs(appleXY.appleX - appleX) < MINDIFFERENCE || Math.abs(appleXY.appleY - appleY) < MINDIFFERENCE
          );
          if (!isTooClose) {
            appleXYArr.push(appleXY);
          }
        }
      }

      return appleXYArr;
    },
    [generateRandomPointInPolygon]
  );

  useEffect(() => {
    if (treeRef.current && balls) {
      const treeRect = treeRef.current.getBoundingClientRect();
      const points = [
        { x: treeRect.width * 0.18, y: treeRect.height * 0.65 },
        { x: treeRect.width * 0.5, y: treeRect.height * 0.75 },
        { x: treeRect.width * 0.82, y: treeRect.height * 0.65 },
        { x: treeRect.width * 0.5, y: treeRect.height * 0.1 }
      ];

      setApples(getRandomAppleXYArr(points, balls));

      // // 사각형 꼭짓점 표시
      // const treeElement = treeRef.current;
      // points.forEach((point, index) => {
      //   const pointElement = document.createElement('div');
      //   pointElement.style.position = 'absolute';
      //   pointElement.style.left = `${point.x}px`;
      //   pointElement.style.top = `${point.y}px`;
      //   pointElement.style.width = '10px';
      //   pointElement.style.height = '10px';
      //   pointElement.style.backgroundColor = 'blue';
      //   pointElement.style.borderRadius = '50%';
      //   pointElement.style.zIndex = '10';
      //   pointElement.innerText = `${index + 1}`;
      //   pointElement.style.color = 'white';
      //   pointElement.style.display = 'flex';
      //   pointElement.style.alignItems = 'center';
      //   pointElement.style.justifyContent = 'center';
      //   treeElement.appendChild(pointElement);
      // });

      // // 사각형 경계선 표시
      // const rectangleLines = document.createElement('div');
      // rectangleLines.style.position = 'absolute';
      // rectangleLines.style.left = '0';
      // rectangleLines.style.top = '0';
      // rectangleLines.style.width = '100%';
      // rectangleLines.style.height = '100%';
      // rectangleLines.style.pointerEvents = 'none';
      // rectangleLines.innerHTML = `
      //    <svg width="${treeRect.width}" height="${treeRect.height}" style="position:absolute; top:0; left:0; z-index:5;">
      //      <line x1="${points[0].x}" y1="${points[0].y}" x2="${points[1].x}" y2="${points[1].y}" style="stroke:blue; stroke-width:2" />
      //      <line x1="${points[1].x}" y1="${points[1].y}" x2="${points[2].x}" y2="${points[2].y}" style="stroke:blue; stroke-width:2" />
      //      <line x1="${points[2].x}" y1="${points[2].y}" x2="${points[3].x}" y2="${points[3].y}" style="stroke:blue; stroke-width:2" />
      //      <line x1="${points[3].x}" y1="${points[3].y}" x2="${points[0].x}" y2="${points[0].y}" style="stroke:blue; stroke-width:2" />
      //    </svg>
      //  `;
      // treeElement.appendChild(rectangleLines);
    }
  }, [treeRef.current, getRandomAppleXYArr]);

  return (
    <div className="w-full h-full flex justify-center p-2">
      <div ref={treeRef} className="w-full max-w-[32rem] h-full relative">
        <Image
          src="/tree.png"
          alt="트리 이미지"
          fill={true}
          className="object-contain"
          sizes="(max-width: 600px) 100vw, 50vw"
          priority={true}
          blurDataURL="/loading_img.gif"
          placeholder="blur"
        />
        {/* {isLoading && (
          <div className="h-3/6 w-full flex justify-center items-center bg-white bg-opaticy-50 absolute">
            트리에 장식이 달리고 있어요...!
          </div>
        )} */}
        {apples.map((apple, index) => (
          <button
            key={index}
            className={`absolute flex justify-center items-center`}
            style={{
              width: `${BALLSIZE}rem`,
              height: `${BALLSIZE}rem`,
              left: `${apple.appleX}px`,
              top: `${apple.appleY}px`
            }}
            onClick={() => handleUserOpenArr(index)}
          >
            <Image
              src={tree_balls[index]}
              alt="tree_ball 이미지"
              fill={true}
              className="object-contain"
              priority={true}
              blurDataURL="/loading_img.gif"
              placeholder="blur"
            />
            {balls && userOpenArr && userOpenArr[index] && (
              <BallBtn balls={balls} index={index} userOpenArr={userOpenArr} setUserOpenArr={setUserOpenArr} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmPage;
