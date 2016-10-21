class Router {

  constructor(node, routes) {
    this.node = node;
    this.routes = routes;
  }

  start() {
    window.addEventListener("hashchange", () => {
      this.render();
    });
    this.render();
  }

  activeRoute() {
    return this.routes[window.location.hash.slice(1)];
  }

  render() {
    this.node.innerHTML = "";
    let component = this.activeRoute();
    if (component) {
      this.node.innerHTML = "";
      this.node.appendChild(component.render());
    } else {
      this.node.innerHTML = "";
    }
  }
}

module.exports = Router;
