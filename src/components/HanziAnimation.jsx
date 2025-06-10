import { useEffect, useRef } from 'react';

/**
 * 简化的汉字动画组件，用于在卡片中显示
 */
export function SimpleHanziAnimation({ char, size = 100 }) {
  const targetRef = useRef(null);
  const writerRef = useRef(null);

  useEffect(() => {
    if (!char || !targetRef.current) return;

    // 清理之前的实例
    if (writerRef.current) {
      writerRef.current = null;
    }

    // 清空容器
    targetRef.current.innerHTML = '';
    // 动态导入 HanziWriter
    import('hanzi-writer').then((HanziWriter) => {
      try {
        // 创建新的 HanziWriter 实例
        const writer = HanziWriter.default.create(targetRef.current, char, {
          width: size,
          height: size,
          padding: 5,
          strokeColor: '#2563eb', // 蓝色笔画
          strokeAnimationSpeed: 1,
          delayBetweenStrokes: 200,
          showOutline: true,
          showCharacter: false,
          outlineColor: '#e5e7eb', // 灰色轮廓
          charColor: '#9ca3af', // 灰色字符
          radicalColor: '#ef4444', // 红色部首
          highlightColor: '#fbbf24', // 黄色高亮
          drawingColor: '#059669', // 绿色绘制
          strokeWidth: 3,
          outlineWidth: 2,
          charOpacity: 0.3,
          strokeAnimationSpeed: 0.8,
          delayBetweenStrokes: 150
        });

        writerRef.current = writer;

      } catch (error) {
        console.error('创建汉字动画时出错:', error);
        // 如果字符不支持，显示静态字符
        if (targetRef.current) {
          targetRef.current.innerHTML = `<div style="width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center; font-size: ${Math.min(size, size) * 0.6}px; color: #6b7280;">${char}</div>`;
        }
      }
    }).catch((error) => {
      console.error('加载 HanziWriter 失败:', error);
      // 显示静态字符作为后备
      if (targetRef.current) {
        targetRef.current.innerHTML = `<div style="width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center; font-size: ${Math.min(size, size) * 0.6}px; color: #6b7280;">${char}</div>`;
      }
    });

    return () => {
      if (writerRef.current) {
        writerRef.current = null;
      }
    };
  }, [char, size]);

  return <div ref={targetRef} className="hanzi-animation-container" />;
}

/**
 * 带控制按钮的汉字动画组件
 */
export function HanziAnimationWithControls({ char, width = 200, height = 200 }) {
  const targetRef = useRef(null);
  const writerRef = useRef(null);

  useEffect(() => {
    if (!char || !targetRef.current) return;

    // 清理之前的实例
    if (writerRef.current) {
      writerRef.current = null;
    }

    // 清空容器
    targetRef.current.innerHTML = '';

    // 动态导入 HanziWriter
    import('hanzi-writer').then((HanziWriter) => {
      try {
        // 创建新的 HanziWriter 实例
        const writer = HanziWriter.default.create(targetRef.current, char, {
          width: width,
          height: height,
          padding: 5,
          strokeColor: '#2563eb', // 蓝色笔画
          strokeAnimationSpeed: 1,
          delayBetweenStrokes: 200,
          showOutline: true,
          showCharacter: false,
          outlineColor: '#e5e7eb', // 灰色轮廓
          charColor: '#9ca3af', // 灰色字符
          radicalColor: '#ef4444', // 红色部首
          highlightColor: '#fbbf24', // 黄色高亮
          drawingColor: '#059669', // 绿色绘制
          strokeWidth: 3,
          outlineWidth: 2,
          charOpacity: 0.3,
          strokeAnimationSpeed: 0.8,
          delayBetweenStrokes: 150
        });

        writerRef.current = writer;

      } catch (error) {
        console.error('创建汉字动画时出错:', error);
        // 如果字符不支持，显示静态字符
        if (targetRef.current) {
          targetRef.current.innerHTML = `<div style="width: ${width}px; height: ${height}px; display: flex; align-items: center; justify-content: center; font-size: ${Math.min(width, height) * 0.6}px; color: #6b7280;">${char}</div>`;
        }
      }
    }).catch((error) => {
      console.error('加载 HanziWriter 失败:', error);
      // 显示静态字符作为后备
      if (targetRef.current) {
        targetRef.current.innerHTML = `<div style="width: ${width}px; height: ${height}px; display: flex; align-items: center; justify-content: center; font-size: ${Math.min(width, height) * 0.6}px; color: #6b7280;">${char}</div>`;
      }
    });

    return () => {
      if (writerRef.current) {
        writerRef.current = null;
      }
    };
  }, [char, width, height]);

  // 开始动画
  const startAnimation = () => {
    if (writerRef.current) {
      writerRef.current.animateCharacter();
    }
  };

  // 显示轮廓
  const showOutlineOnly = () => {
    if (writerRef.current) {
      writerRef.current.showOutline();
    }
  };

  // 显示完整字符
  const showCompleteCharacter = () => {
    if (writerRef.current) {
      writerRef.current.showCharacter();
    }
  };

  // 隐藏字符
  const hideCharacter = () => {
    if (writerRef.current) {
      writerRef.current.hideCharacter();
    }
  };

  // 开始测验模式
  const startQuiz = () => {
    if (writerRef.current) {
      writerRef.current.quiz();
    }
  };

  return (
    <div className="space-y-4">
      <div ref={targetRef} className="hanzi-animation-container" />
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={startAnimation}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
        >
          播放动画
        </button>
        <button
          onClick={showOutlineOnly}
          className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
        >
          显示轮廓
        </button>
        <button
          onClick={showCompleteCharacter}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
        >
          显示完整
        </button>
        <button
          onClick={hideCharacter}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
        >
          隐藏字符
        </button>
        <button
          onClick={startQuiz}
          className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors"
        >
          练习模式
        </button>
      </div>
    </div>
  );
}

export default { SimpleHanziAnimation, HanziAnimationWithControls };

