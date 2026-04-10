import { cpSync } from 'node:fs';

import { defineConfig } from 'tsup';

const isDockerBuild = process.env.DOCKER_ENV === 'true';

export default defineConfig({
  entry: ['src'],
  outDir: 'dist',
  splitting: false,
  sourcemap: !isDockerBuild,
  clean: true,
  minify: !isDockerBuild,
  format: isDockerBuild ? ['cjs'] : ['cjs', 'esm'],
  onSuccess: async () => {
    cpSync('src/utils/translations', 'dist/translations', { recursive: true });
  },
  loader: {
    '.json': 'file',
    '.yml': 'file',
  },
});
