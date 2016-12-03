<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%> 
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">
	<title>Login</title>
	<%-- Urls --%>
	<spring:url value="/admin" var="root_path" />
	<spring:url value="/resources/share" var="share_resource" />
	<spring:url value="/resources/admin" var="root_resource" />

	<%-- Libs --%>
	<link href="${share_resource}/css/font-awesome.min.css" rel="stylesheet">
	<link href="${share_resource}/css/bootstrap.min.css" rel="stylesheet">
	<link href="${share_resource}/css/metisMenu.min.css" rel="stylesheet">
	<link href="${share_resource}/css/timeline.css" rel="stylesheet">

	<%-- Custom --%>
	<link href="${root_resource}/style.css" rel="stylesheet">

	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-md-4 col-md-offset-4">
				<div class="login-panel panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title"><spring:message code="admin.login.title"/></h3>
					</div>
					<div class="panel-body">
						<form name="loginForm" role="form" action="<c:url value='/admin/login/j_spring_security_check' />" method='POST'>
							<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
							<fieldset>
								<div class="form-group">
									<input class="form-control" placeholder="<spring:message code="admin.login.login_name"/>" name="username"
										type="text" autofocus>
								</div>
								<div class="form-group">
									<input class="form-control" placeholder="<spring:message code="admin.login.password"/>" name="password" type="password" value="">
								</div>
								<div class="checkbox">
									<label> <input name="remember" type="checkbox"
										value="Remember Me">Remember Me
									</label>
								</div>
								<input type="submit" class="btn btn-lg btn-success btn-block" value="<spring:message code="admin.login.login"/>" />
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>

	<%-- Libs --%>
	<script src="${share_resource}/js/jquery.min.js"></script>
	<script src="${share_resource}/js/bootstrap.min.js"></script>
	<script src="${share_resource}/js/metisMenu.min.js"></script>

	<%-- Custom --%>
	<script src="${root_resource}/script.js"></script>
</body>
</html>
