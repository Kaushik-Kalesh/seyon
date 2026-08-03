<script lang="ts">
  import { enhance } from '$app/forms';
  let { form } = $props();
  
  let pinInput = $state('');
  let formElement: HTMLFormElement;

  $effect(() => {
    if (pinInput.length === 4) {
      formElement.submit();
    }
  });
</script>

<svelte:head>
  <title>Admin Access | Seyon</title>
</svelte:head>

<div class="min-h-screen bg-base flex items-center justify-center p-4 font-sans">
  <div class="bg-white border border-gray-200 rounded-3xl p-10 w-full max-w-sm text-center shadow-2xl">
    <div class="text-5xl mb-6">🔒</div>
    <h2 class="text-2xl font-bold text-dark mb-2">Admin Access</h2>
    <p class="text-dark-gray text-sm mb-8">Enter your PIN to manage the website</p>
    
    <form method="POST" action="?/login" bind:this={formElement} use:enhance>
      <div class="mb-2">
        <input 
          type="password" 
          name="pin"
          bind:value={pinInput} 
          placeholder="••••" 
          maxlength="4"
          autofocus
          class="w-full text-center text-3xl tracking-[1em] pl-[1em] py-4 rounded-xl border {form?.error ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:border-primary transition-colors focus:bg-white"
        />
      </div>
      <div class="h-6 mt-2">
        {#if form?.error}
          <p class="text-red-500 text-sm animate-[shake_0.3s_ease-in-out]">{form.error}</p>
        {/if}
      </div>
    </form>
    
    <a href="/" class="mt-8 text-sm text-gray-400 hover:text-dark transition-colors inline-block">
      &larr; Back to Website
    </a>
  </div>
</div>

<style>
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
</style>
