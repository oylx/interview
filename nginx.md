## 1.正向代理/反向代理

1、**正向代理其实是客户端的代理**，帮助客户端访问其无法访问的服务器资源。**反向代理则是服务器的代理**，帮助服务器做负载均衡，安全防护等。

2、**正向代理一般是客户端架设的**，比如在自己的机器上安装一个代理软件。而**反向代理一般是服务器架设的**，比如在自己的机器集群中部署一个反向代理服务器。

3、**正向代理中，服务器不知道真正的客户端到底是谁**，以为访问自己的就是真实的客户端。而在**反向代理中，客户端不知道真正的服务器是谁**，以为自己访问的就是真实的服务器。

4、正向代理和反向代理的作用和目的不同。**正向代理主要是用来解决访问限制问题。而反向代理则是提供负载均衡、安全防护等作用。二者均能提高访问速度。**

正向代理：举个具体的例子 🌰，你的浏览器无法直接访问谷哥，这时候可以通过一个代理服务器来帮助你访问谷哥，那么这个服务器就叫正向代理，比如vpn

反向代理：举个具体的例子 🌰，去饭店吃饭，可以点川菜、粤菜、江浙菜，饭店也分别有三个菜系的厨师 👨‍🍳，但是你作为顾客不用管哪个厨师给你做的菜，只用点菜即可，小二将你菜单中的菜分配给不同的厨师来具体处理，那么这个小二就是反向代理服务器。比如nginx的proxy_pass

```
location ~ ^/message/ {
  proxy_set_header   Host             $proxy_host;
  proxy_set_header   platform         merchant;
  proxy_set_header   X-Real-IP        $remote_addr;
  proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
  proxy_pass http://st.crosscloud.youpin.srv;
}
```



![正向代理与反向代理](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/29/171c4e96d99eecdc~tplv-t2oaga2asx-watermark.awebp)

## 2.负载均衡

使用多个服务器，然后将请求分发到各个服务器上，将负载分发到不同的服务器，这就是**负载均衡**，核心是「分摊压力」。Nginx 实现负载均衡，一般来说指的是将请求转发给服务器集群.

具体的例子 🌰，晚高峰乘坐地铁的时候，入站口经常会有地铁工作人员大喇叭“请走 B 口，B 口人少车空....”，这个工作人员的作用就是负载均衡。比如upstream：

```
upstream login_backend {
  server 10.142.30.50:18960 max_fails=3 fail_timeout=5s; #c3-mijia-login00.bj
  server 10.142.67.21:18960 max_fails=3 fail_timeout=5s; #c3-mijia-login01.bj
  server 10.162.30.24:18960 backup; #c4-mijia-login00.bj
  server 10.132.18.41:18960 backup; #c4-mijia-login01.bj
}
```



![负载均衡](https://cdn.jsdelivr.net/gh/SHERlocked93/pic@env/uPic/2020-03-09-%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1.png)
