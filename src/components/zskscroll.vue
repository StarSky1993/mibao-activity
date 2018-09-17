<script>
  import zscroll from './zscroll';
  import allloading from './common/allLoading';
	const scroll= {
		install: function(Vue)  {
			Vue.component('scroll', zscroll );
			Vue.component('all-loading', allloading);
		}
	}
   export default scroll
</script>
