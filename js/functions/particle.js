//通用背景粒子效果js
const canvas=document.getElementById('particle-canvas'); //获取canvas画布
const ctx=canvas.getContext('2d');                       //2d效果
const dpr = window.devicePixelRatio || 1;                  //获取像素比，实现高清动画
const rect=canvas.getBoundingClientRect();          //获取画布的实际尺寸
const WIDTH = rect.width;
const HEIGHT = rect.height;
canvas.width = WIDTH * dpr;
canvas.height = HEIGHT * dpr;
ctx.scale(dpr,dpr);
let particles=[];                   //生成粒子数组
const particleCount=80;             //设置粒子数量
class Particle {                    //给每一个粒子的初始量
    constructor() {
        this.x=Math.random()*WIDTH;             //初始位置
        this.y=Math.random()*HEIGHT;            
        this.size=Math.random()*2+0.5;          //初始大小
        this.speedX=Math.random()*0.5+0.1;      //x方向速度
        this.speedY=Math.random()*-0.8-0.2;     //y方向速度
        this.opacity=1;         
        this.fadeSpeed=Math.random()*0.001+0.005;      //粒子的消失速度
        this.colorShift = Math.random() > 0.5 ? 20 : -20;   //粒子的颜色变化范围
    }
    reset() {                                   //粒子的重置函数
        this.x=Math.random()*WIDTH;
        this.y=Math.random()*HEIGHT;
        this.opacity=1;
    }                                           //粒子位置更新函数
    update() {
        this.x+=this.speedX;            
        this.y+=this.speedY;
        this.opacity-=this.fadeSpeed;
        if(this.opacity<=0) {
            this.reset();
        }
    }
    draw() {                                    
        ctx.beginPath();                        //开辟一条新路径以绘制粒子
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);       //x，y为圆心，size为半径画圆
        ctx.fillStyle = `hsla(${110+this.colorShift},100%,50%,${this.opacity})`;        //使用HSL色彩模式，色相为110加上颜色变化范围，饱和度100%，亮度50%，并以当前粒子透明度为透明度
        ctx.shadowBlur = 5;                     //设置阴影模糊半径
        ctx.shadowColor = `hsla(${110 + this.colorShift}, 100%, 50%, ${Math.min(this.opacity, 0.5)})`; //设置阴影颜色与当前粒子颜色一致
        ctx.fill();                             //绘制圆形路径
        ctx.shadowBlur = 0;                     //重置阴影
    }
}
function initParticles() {                      
    for(let i=0;i<particleCount;i++)
    {
        particles.push(new Particle());             //创建粒子并添加至粒子数组
        particles[i].y=Math.random()*HEIGHT;
        particles[i].opacity=Math.random();
    }
}
function animateParticles() {                   
    ctx.clearRect(0,0,WIDTH,HEIGHT);                //每一帧都清除这个粒子
    particles.forEach(p=>{                          
        p.update();                                 //更新并绘制新的粒子
        p.draw();
    })
    requestAnimationFrame(animateParticles);            //递归调用自身，持续动画
}
initParticles();
animateParticles();
