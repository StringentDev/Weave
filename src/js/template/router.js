(async function() {try {
const routes = {
  '/index' : await read("static/index.html")
};
path = window.location.pathname
path = path.replace(__dirname, "").replace(".html", "")
data = routes[path]
RenderElement(
	data,
	{
		name: window.location.pathname
	}
)

const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  )
  path = window.location.pathname
	path = path.replace(__dirname, "").replace(".html", "")
	data = routes[path]
	RenderElement(
		data,
		{
			name: window.location.pathname
		}
	)
}

window.onpopstate = () => {
	path = window.location.pathname
	path = path.replace(__dirname, "").replace(".html", "")
	data = routes[path]
	RenderElement(
		data,
		{
			name: window.location.pathname
		}
	)
}

} catch(e) {
	console.log(e)
}}())