import cnchar from 'cnchar';
import 'cnchar-all';

// 初始化cnchar
cnchar.use();

/**
 * 汉字分析工具类
 */
export class HanziAnalyzer {
  /**
   * 分析单个汉字
   * @param {string} char - 要分析的汉字
   * @returns {object} 汉字的详细信息
   */
  static analyzeChar(char) {
    if (!char || char.length !== 1) {
      return null;
    }

    try {
      const result = {
        char: char,
        pinyin: cnchar.spell(char, 'tone'), // 带声调的拼音
        pinyinArray: cnchar.spell(char, 'array', 'tone'), // 多音字数组
        stroke: cnchar.stroke(char), // 笔画数
        strokeOrder: cnchar.stroke(char, 'array'), // 笔画顺序
        radical: cnchar.radical ? cnchar.radical(char) : '暂无', // 部首
        structure: this.getStructure(char), // 汉字结构
        traditional: cnchar.convert ? cnchar.convert.simpleToTrad(char) : char, // 繁体字
        wubi: this.getWubi(char), // 五笔编码
        wuxing: this.getWuxing(char), // 五行属性
        meaning: this.getMeaning(char), // 基本含义
        words: this.getWords(char), // 组词
        sentences: this.getSentences(char) // 例句
      };

      return result;
    } catch (error) {
      console.error('分析汉字时出错:', error);
      return null;
    }
  }

  /**
   * 分析多个汉字
   * @param {string} text - 要分析的文本
   * @returns {array} 汉字分析结果数组
   */
  static analyzeText(text) {
    if (!text) return [];
    
    const chars = text.split('').filter(char => /[\u4e00-\u9fff]/.test(char));
    return chars.map(char => this.analyzeChar(char)).filter(result => result !== null);
  }

  /**
   * 获取五笔编码
   * @param {string} char - 汉字
   * @returns {string} 五笔编码
   */
  static getWubi(char) {
    // 简化的五笔编码映射
    const wubiMap = {
      '学': 'IPBF',
      '习': 'NUD',
      '人': 'WWWW',
      '大': 'DDDD',
      '小': 'IHTY',
      '上': 'HHGG',
      '下': 'GHI',
      '中': 'KHK',
      '好': 'VBG',
      '生': 'TGD',
      '字': 'PBF'
    };
    return wubiMap[char] || '暂无';
  }

  /**
   * 获取汉字结构
   * @param {string} char - 汉字
   * @returns {string} 汉字结构
   */
  static getStructure(char) {
    // 这里可以根据部首和笔画来判断结构
    // 简化实现，实际可以使用更复杂的算法
    const structures = {
      '左右结构': ['他', '们', '你', '我', '好', '的', '在', '是', '有', '不'],
      '上下结构': ['字', '学', '生', '花', '草', '笑', '哭', '想', '思', '意'],
      '左中右结构': ['谢', '湖', '树', '街', '做', '搬', '脚', '班', '辨', '辩'],
      '上中下结构': ['意', '章', '竟', '高', '亮', '景', '影', '营', '警', '察'],
      '全包围结构': ['国', '园', '圆', '因', '困', '围', '图', '团', '回', '四'],
      '半包围结构': ['同', '问', '间', '闻', '门', '闪', '闭', '开', '关', '这'],
      '独体结构': ['人', '大', '小', '上', '下', '中', '一', '二', '三', '十']
    };

    for (const [structure, chars] of Object.entries(structures)) {
      if (chars.includes(char)) {
        return structure;
      }
    }
    return '其他结构';
  }

  /**
   * 获取五行属性
   * @param {string} char - 汉字
   * @returns {string} 五行属性
   */
  static getWuxing(char) {
    // 简化的五行判断，实际应该根据更复杂的规则
    const wuxingMap = {
      '金': ['金', '银', '铁', '钢', '铜', '锡', '铝', '钱', '针', '钟'],
      '木': ['木', '树', '林', '森', '花', '草', '叶', '根', '枝', '果'],
      '水': ['水', '河', '海', '湖', '江', '池', '雨', '雪', '冰', '泉'],
      '火': ['火', '炎', '热', '烧', '烤', '灯', '光', '明', '亮', '阳'],
      '土': ['土', '地', '山', '石', '岩', '田', '园', '圆', '城', '墙']
    };

    for (const [wuxing, chars] of Object.entries(wuxingMap)) {
      if (chars.includes(char)) {
        return wuxing;
      }
    }
    return '土'; // 默认为土
  }

  /**
   * 获取基本含义
   * @param {string} char - 汉字
   * @returns {string} 基本含义
   */
  static getMeaning(char) {
    // 简化的含义映射，实际应该从字典API获取
    const meanings = {
      '人': '人类，人民',
      '大': '大小的大，巨大',
      '小': '大小的小，微小',
      '上': '方位词，向上',
      '下': '方位词，向下',
      '中': '中间，中央',
      '一': '数字一，第一',
      '二': '数字二，第二',
      '三': '数字三，第三',
      '十': '数字十',
      '好': '好坏的好，优秀',
      '学': '学习，学问',
      '生': '生命，学生',
      '字': '文字，汉字',
      '我': '第一人称代词',
      '你': '第二人称代词',
      '他': '第三人称代词'
    };

    return meanings[char] || '暂无释义';
  }

  /**
   * 获取组词
   * @param {string} char - 汉字
   * @returns {array} 组词数组
   */
  static getWords(char) {
    // 简化的组词，实际应该从词典获取
    const wordsMap = {
      '人': ['人民', '人类', '人们', '人生', '人物'],
      '大': ['大小', '大家', '大学', '大人', '大地'],
      '小': ['小学', '小孩', '小心', '小鸟', '小花'],
      '上': ['上学', '上班', '上面', '上课', '上午'],
      '下': ['下学', '下班', '下面', '下课', '下午'],
      '中': ['中国', '中间', '中学', '中午', '中心'],
      '好': ['好人', '好事', '好看', '好听', '好吃'],
      '学': ['学习', '学校', '学生', '学问', '学会'],
      '生': ['生活', '生命', '生日', '生气', '生长'],
      '字': ['汉字', '文字', '字母', '字典', '写字']
    };

    return wordsMap[char] || ['暂无组词'];
  }

  /**
   * 获取例句
   * @param {string} char - 汉字
   * @returns {array} 例句数组
   */
  static getSentences(char) {
    // 简化的例句，实际应该从语料库获取
    const sentencesMap = {
      '人': ['人人都有梦想。', '这个人很善良。'],
      '大': ['大象很大。', '他有一个大房子。'],
      '小': ['小鸟在唱歌。', '这是一朵小花。'],
      '上': ['我们上学去。', '书在桌子上面。'],
      '下': ['雨从天空下来。', '请坐下来。'],
      '中': ['中国是我的祖国。', '他在房间中间。'],
      '好': ['今天天气很好。', '这是一个好主意。'],
      '学': ['我喜欢学习。', '学校里有很多学生。'],
      '生': ['生活很美好。', '今天是我的生日。'],
      '字': ['这个字很难写。', '请写出这个字。']
    };

    return sentencesMap[char] || ['暂无例句'];
  }

  /**
   * 获取笔画顺序的详细描述
   * @param {string} char - 汉字
   * @returns {array} 笔画顺序描述数组
   */
  static getStrokeOrderDescription(char) {
    try {
      const strokes = cnchar.stroke(char, 'order');
      const strokeNames = {
        '一': '横',
        '丨': '竖',
        '丿': '撇',
        '丶': '点',
        '乙': '折',
        '亅': '竖钩',
        '丷': '八字头',
        '冫': '两点水',
        '冖': '秃宝盖',
        '十': '十字',
        '厂': '厂字头',
        '匚': '三匡',
        '刂': '立刀旁',
        '卜': '卜字旁',
        '占': '占字头',
        '厶': '私字旁',
        '又': '又字旁'
      };

      return strokes.split('').map((stroke, index) => ({
        order: index + 1,
        stroke: stroke,
        name: strokeNames[stroke] || stroke,
        description: `第${index + 1}笔：${strokeNames[stroke] || stroke}`
      }));
    } catch (error) {
      console.error('获取笔画顺序时出错:', error);
      return [];
    }
  }
}

export default HanziAnalyzer;

