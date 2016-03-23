 ![image](https://github.com/LiZhenNet/GetJobsFromLagou/raw/master/Lagou/public/images/top.jpg)
 ![image](https://github.com/LiZhenNet/GetJobsFromLagou/raw/master/Lagou/public/images/function.jpg)

# GetJobsFromLagou
## 所需环境
1. node环境
2. MongoDB

## 使用步骤
### 1. Clone
```
git clone https://github.com/LiZhenNet/GetJobsFromLagou.git
```
### 2. 还原第三方包
```
cd Lagou
npm install 
```
### 3. 更改config(MongoDB配置与抓取职位与城市)
### 4. 抓取职位信息
```
 node Lagouspider
```
### 5. 显示抓取完成后启动Web页面
```
node  bin\www
```
### 6. 浏览器访问 http://localhost:3000/