export default [
    {
      url: '/api/query',
      method: 'post',
      timeout: 800,
      rawResponse: async (_req: any, res: any) => {
        res.setHeader('Content-Type', 'text/event-stream');
        const words = ['Analyzing…', 'fix', 'MTU', 'mismatch'];
        for (const w of words) {
          res.write(`data: {"token":"${w} "}\n\n`);
          await new Promise(r => setTimeout(r, 400));
        }
        res.end();
      }
    }
  ];
