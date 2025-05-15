
describe('Teste mobile com WebDriverIO', () => {
  it('deve acessar o site e verificar o título da página', async () => {
    await browser.url('https://example.com');
    const titulo = await browser.getTitle();
    console.log('Título da página:', titulo);
    expect(titulo).toContain('Example');
  });
});
