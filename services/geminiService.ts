
import { GoogleGenAI, Type } from "@google/genai";
import { PoetryStyle, PoetryResult } from "../types.ts";

export const generatePoem = async (keywords: string, style: PoetryStyle): Promise<PoetryResult> => {
  // 按照指南，在调用时实例化以获取最新 API Key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // 将具体的创作任务作为 user content
  const userPrompt = `意象与心境：${keywords}\n要求体裁：${style}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: userPrompt }] }],
      config: {
        // 使用 systemInstruction 强化角色设定和格律约束
        systemInstruction: `你是一位精通中国古诗词的大师。
你的任务是根据用户提供的“意象”和“心境”，创作一首格律严谨、意境深远的诗词。

规则：
1. 若体裁为“五言绝句”或“七言绝句”，必须严格遵守平仄与押韵。
2. 若体裁为“宋词”，请务必选择一个合适的词牌名（如《相见欢》、《浣溪沙》等）并在标题中体现。
3. 语言要典雅，具有古风，避免现代白话词汇。
4. 必须深度挖掘用户提供的心境，使诗词具有情感共鸣。
5. 必须返回合法的 JSON 格式。`,
        thinkingConfig: { thinkingBudget: 0 }, // 禁用思考以提高响应成功率
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "诗词标题（宋词需包含词牌名）" },
            author: { type: Type.STRING, description: "富有古意的人名" },
            content: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "诗词正文，每句一个元素" 
            },
            style: { type: Type.STRING, description: "实际采用的体裁" },
            interpretation: { type: Type.STRING, description: "对本诗意境、修辞及情感的深度解读（30-100字）" }
          },
          required: ["title", "author", "content", "style", "interpretation"],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) throw new Error("墨尽词穷，未能成诗");
    
    // 增强的 JSON 解析逻辑
    const cleanJson = resultText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanJson) as PoetryResult;
    
    // 简单校验返回内容
    if (!parsed.content || parsed.content.length === 0) {
      throw new Error("生成的诗词内容不完整");
    }
    
    return parsed;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // 针对 500 错误提供更友好的提示
    if (error.message?.includes('500') || error.message?.includes('xhr')) {
      throw new Error("云端笔墨告罄，请稍后再试（API 暂时不可用）");
    }
    throw new Error(error.message || "诗灵未至，请检查输入后重试");
  }
};
