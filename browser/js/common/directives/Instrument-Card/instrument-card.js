app.directive('productCard', function(){
	return {
		restrict: 'E',
		scope:{
			product: '='
		},
		//used this template instead of templateURL due to heroku error
		template: "\
		<div class='container col-xs-12 col-md-4'> \
			<div>\
				<h3 class='text-center'>{{product.title}}</h3> \
				<a ui-sref='productDetail({ id: {{product.id}} })'' class='thumbnail'> \
					<img class='img-responsive' style='width:100%;height:250px;' ng-src='{{product.image[0]}}'' alt='product pic'/> \
				</a> \
			</div> \
			<div>	\
				<p>{{product.description}}</p> \
			</div> \
		<br clear='all'> \
		</div>"
	}
});