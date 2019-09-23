export default function (server) {

  server.route({
    path: '/api/pivottable/example',
    method: 'GET',
    handler() {
      return { time: (new Date()).toISOString() };
    }
  });

}
