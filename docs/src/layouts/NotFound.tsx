import { A } from '@solidjs/router';

export function NotFound() {
  return (
    <main class="h-screen mx-auto p-4 text-center text-gray-700">
      <h1 class="max-6-xs my-16 text-6xl font-thin text-default dark:text-electric uppercase">
        Not Found
      </h1>
      <p class="mt-8">
        返回
        <A href="/" class="text-default dark:text-electric hover:underline">
          主页
        </A>
      </p>
    </main>
  );
}
