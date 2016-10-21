<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page session="false"%>
<spring:url value="/resources/web/images" var="images" />


<header>
		<div class="tophead">
			<div class=" colorw topheadright">
				<!-- Khi nao login thanh cong thi hien ra
				<ul>
					<li>
						<img src="${images}/thong bao">
					</li>
					<li>
						<img src="${images}/inbox">
					</li>
					<li>
						Xin chao Admin,  thay the button Shop Login 
					</li>

				</ul>
				  -->
				<button class="shoplogin">Shop Đăng Nhập</button>
			</div>
			<div class="panel-group topheadleft">
			      <h4 class="panel-title anoneunder language">
			      	<a class="anoneunder" data-toggle="collapse" href="#collapse1">
			      	<span><img class="ico" src="${images}/vietnamicon.ico"/><span>
			        <span class="colorw" style="font-size: 12px;">LANGUAGE</span>
			        </a>
			      </h4>
			    <div id="collapse1" class="country panel-collapse collapse">
			    	  <div>
					      <a class="panel-title" data-toggle="collapse" href="#collapse1">
					      	<img class="ico" src="${images}/unitedkingdomicon.ico">
					        <span>English</span>
					      </a>
			      	  </div>
				      <div>
					      <a class="panel-title" data-toggle="collapse" href="#collapse1">
					      	<img class="ico" src="${images}/bruneiicon.ico">
					        <span>Brunei</span>
					      </a>
				      </div>
				      <div>
					      <a class="panel-title" data-toggle="collapse" href="#collapse1">
					      	<img class="ico" src="${images}/cambodiaicon.ico">
					        <span>Cambodia</span>
					      </a>
				      </div>
				      <div>
					      <a class="panel-title" data-toggle="collapse" href="#collapse1">
					      	<img class="ico" src="${images}/chinaicon.ico">
					        <span>China</span>
					      </a>
				      </div>
				      <div>
					      <a class="panel-title" data-toggle="collapse" href="#collapse1">
					      	<img class="ico" src="${images}/indonesiaicon.ico">
					        <span>Indonesia</span>
					      </a>
				      </div>
				      <div>
					      <a class="panel-title" data-toggle="collapse" href="#collapse1">
					      	<img class="ico" src="${images}/laosicon.ico">
					        <span>Lao PDR</span>
					      </a>
				      </div>
				      <div>
					      <a class="panel-title" data-toggle="collapse" href="#collapse1">
					      	<img class="ico" src="${images}/malaysiaicon.ico">
					        <span>Malaysia</span>
					      </a>
				      </div>
				      <div>
					      <a class="panel-title" data-toggle="collapse" href="#collapse1">
					      	<img class="ico" src="${images}/myanmaricon.ico">
					        <span>Myanmar</span>
					      </a>
				      </div>
				      <div>
					      <a class="panel-title" data-toggle="collapse" href="#collapse1">
					      	<img class="ico" src="${images}/philippines.ico">
					        <span>Philippines</span>
					      </a>
				      </div>
				      <div>
					      <a class="panel-title" data-toggle="collapse" href="#collapse1">
					      	<img class="ico" src="${images}/singaporeicon.ico">
					        <span>Singapore</span>
					      </a>
				      </div>
				      <div>
					      <a class="panel-title" data-toggle="collapse" href="#collapse1">
					      	<img class="ico" src="${images}/thailandicon.ico">
					        <span>Thailand</span>
					      </a>
				      </div>
				      <div>
					      <a class="panel-title" data-toggle="collapse" href="#collapse1">
					      	<img class="ico" src="${images}/vietnamicon.ico">
					        <span>Viet Nam</span>
					        <img class="ico accept" src="${images}/accept.ico">
					      </a>
				      </div>
			    </div>
			</div>	
		</div>

		<div class="mainhead">
			<div class="colorw logo" style="font-size:35px; ">LOGO</div>
			<div class="contenthead">
				<ul>
					<li>
						<div class="bill">
							<a class="cart" href="#">
								<img class="cartimg" src="${images}/cart.ico" alt="">
								<h5 class="productcart">Giỏ hàng</h5>
								<h6 class="productcart">0 Sản phẩm - 0đ.</h6>
							</a>
						</div>
					</li>
					
					<li>
						<div class="search">
							<a href="#">
								<div>
									<input class="inputsearch" type="text" name="">
									
								<div>
								<div class="btsearch">
									<span class="textsearch">Search</span>
									<img class="imgsearch" src="${images}/search.ico">
								</div>
							</a>
						</div>	
					</li>
				</ul>
			</div>	
			<div class="userlogin ">
				<a href="#">Đăng ký</a>
				<a href="#">Đăng nhập</a>
			</div>	
		</div>


	</header>
	<nav>
		<div class="menu">
			<div class="dropdown">
	          <a class="dropdown-toggle" data-toggle="dropdown" href="#">
				<div class="menuproduct">
					<div class="colorw menubt ">DANH MỤC SẢN PHẨM</div>
					<img class="imgdown" src="${images}/icondown.ico" alt="">
				</div>
	          </a>
	          <ul class="dropdown-menu menumain pull-left">
	            <li><a href="#">Áo cho nam</a></li>
	            <li><a href="#">Áo cho nữ</a></li>
	            <li><a href="#">Quần cho nam</a></li>
	            <li><a href="#">Quần cho nữ</a></li>
	          </ul>
	        </div>
			

			<div class="navmenu sidenav">
				<img class="line line1" src="${images}/line.png">
				<div class="navigation  news">Tin tức</div>
				<img class="line line2" src="${images}/line.png">
				<div class="navigation aboutus">Giới thiệu</div>
				<img class="line line3" src="${images}/line.png">
				<div class="navigation payment">Thanh Toán</div>
				<img class="line line4" src="${images}/line.png">
				<div class="navigation contact">Liên hệ</div>
				<img class="line line5" src="${images}/line.png">
			</div>
		</div>
		<div class="banner"></div>
	</nav>
	
	<div class="mobi navbar navbar-inverse">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span> 
	      </button>
	      <span class="mn">Menu</span>
	    </div>
	    <div class="collapse navbar-collapse" id="myNavbar">
	      <ul class="nav navbar-nav">
	      	<img class="line line1" src="${images}/line.png">
	        <li class="active"><a href="#"><div class="navigation news">Tin tức</div></a></li>
	        <img class="line line2" src="${images}/line.png">
	        <li><a href="#"><div class="navigation aboutus">Giới thiệu</div></a></li>
	        <img class="line line3" src="${images}/line.png">
	        <li><a href="#"><div class="navigation payment">Thanh Toán</div></a></li> 
	        <img class="line line4" src="${images}/line.png">
	        <li><a href="#"><div class="navigation contact">Liên hệ</div></a></li> 
	        <img class="line line5" src="${images}/line.png">
	      </ul>
	     
	    </div>
	  </div>
	</div>