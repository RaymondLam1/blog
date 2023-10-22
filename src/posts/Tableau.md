---
title: Tableau LOD 15题
category:
  - 技术
tag:
  - BI
---

使用 Tableau 完成 LOD 15题

<!-- more -->

题目地址：https://www.tableau.com/zh-cn/blog/LOD-expressions

### 题目3

![alt text](assets/Tableau/image.png)

![alt text](assets/Tableau/image-1.png)

### 题目4

![alt text](assets/Tableau/image-2.png)

标记标签感觉不太好用，不知道有没有更加方便的方式

### 题目5

![alt text](assets/Tableau/image-3.png)

![alt text](assets/Tableau/image-4.png)

日期相关不同，有什么含义呢？业内术语叫什么呢？

### 题目6

![alt text](assets/Tableau/image-6.png)

创建参数可真难找啊：

![alt text](assets/Tableau/image-5.png)

发现给数据加个颜色也挺蛋疼的

### 题目7

做出两个工作表：

![alt text](assets/Tableau/image-10.png)

![alt text](assets/Tableau/image-11.png)

基于两个工作表做出仪表板：

![alt text](assets/Tableau/image-9.png)



参考线是通过在横轴右键添加的：

![alt text](assets/Tableau/image-7.png)


操作筛选器是在这里添加的：

![alt text](assets/Tableau/image-8.png)

### 题目8

![alt text](assets/Tableau/image-13.png)

数字设置百分比的方式：
![alt text](assets/Tableau/image-12.png)

### 题目9

![alt text](assets/Tableau/image-14.png)

注意处理“双轴”


### 题目10

![alt text](assets/Tableau/image-15.png)

(DATEPART('year', [首次购买时间])*100 + DATEPART('month', [首次购买时间]))

DATEPART('quarter', [首次购买时间])

DATETRUNC('quarter', [首次购买时间])


### 题目11

![alt text](assets/Tableau/image-16.png)

有个单独的图例找不到，很烦人


### 题目12

![alt text](assets/Tableau/image-17.png)

学习到累积汇总

### 题目13

![alt text](assets/Tableau/image-18.png)

### 题目14

![alt text](assets/Tableau/image-19.png)


### 题目15

![alt text](assets/Tableau/image-22.png)

## 总结

Tableau 入门后，感觉用起来挺爽的，就是国内的资料文档等做得比较差，很难获取到有用的信息。

## 参考
* https://kms.fineres.com/display/DR/LOD15+-+Tableau
* https://kms.fineres.com/pages/viewpage.action?pageId=848824144
* https://kms.fineres.com/pages/viewpage.action?pageId=361636161

