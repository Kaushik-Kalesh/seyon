<script lang="ts">
  let { value = $bindable(), placeholder = "" } = $props();
  let editorRef: HTMLDivElement;
  let isFocused = $state(false);
  
  let isLinkModalOpen = $state(false);
  let linkUrl = $state('');
  let linkLabel = $state('');
  let savedRange: Range | null = null;
  let showLabelInput = $state(false);

  $effect(() => {
    if (editorRef && document.activeElement !== editorRef) {
      if (editorRef.innerHTML !== value) {
        editorRef.innerHTML = value || "";
      }
    }
  });

  function format(command: string, arg: string | null = null) {
    document.execCommand(command, false, arg);
    editorRef.focus();
    updateValue();
  }

  function openLinkModal() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedRange = selection.getRangeAt(0).cloneRange();
      showLabelInput = selection.toString().trim().length === 0;
    } else {
      savedRange = null;
      showLabelInput = true;
    }
    linkUrl = '';
    linkLabel = '';
    isLinkModalOpen = true;
  }

  function confirmLink() {
    isLinkModalOpen = false;
    
    if (savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRange);
    }

    if (!linkUrl) return;

    if (!showLabelInput) {
      format('createLink', linkUrl);
    } else if (linkLabel) {
      format('insertHTML', `<a href="${linkUrl}" class="text-primary underline font-medium" target="_blank">${linkLabel}</a>`);
    }
  }

  function updateValue() {
    if (editorRef) {
      value = editorRef.innerHTML;
    }
  }
</script>

<div class="border {isFocused ? 'border-primary ring-2 ring-primary/20' : 'border-gray-300'} rounded-lg overflow-hidden bg-white transition-all relative">
  <div class="bg-gray-50 border-b border-gray-200 px-2 py-1.5 flex flex-wrap gap-1 items-center">
    <button type="button" onclick={() => format('bold')} class="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded text-sm font-bold text-gray-700 transition-colors" title="Bold">B</button>
    <button type="button" onclick={() => format('italic')} class="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded text-sm italic text-gray-700 transition-colors" title="Italic">I</button>
    <button type="button" onclick={() => format('underline')} class="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded text-sm underline text-gray-700 transition-colors" title="Underline">U</button>
    <div class="w-px h-5 bg-gray-300 mx-1"></div>
    <button type="button" onclick={openLinkModal} class="px-2 h-8 flex items-center justify-center hover:bg-gray-200 rounded text-sm text-gray-700 transition-colors font-medium" title="Add Link">
      <svg class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
      Link
    </button>
  </div>
  
  <div 
    bind:this={editorRef}
    contenteditable="true"
    class="p-4 min-h-[12rem] max-h-[30rem] overflow-y-auto outline-none prose max-w-none text-dark-gray"
    oninput={updateValue}
    onblur={() => { isFocused = false; updateValue(); }}
    onfocus={() => { isFocused = true; }}
    {placeholder}
  ></div>

  {#if isLinkModalOpen}
    <div class="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm p-4">
      <div class="bg-white rounded-xl shadow-2xl border border-gray-100 p-5 w-full max-w-sm">
        <h3 class="text-sm font-bold text-dark mb-4">Add Link</h3>
        
        <div class="mb-3">
          <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">URL</label>
          <input bind:value={linkUrl} type="url" placeholder="https://..." class="w-full px-3 py-2 text-sm bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
        </div>

        {#if showLabelInput}
          <div class="mb-4">
            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Link Text</label>
            <input bind:value={linkLabel} type="text" placeholder="Click here" class="w-full px-3 py-2 text-sm bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
          </div>
        {/if}

        <div class="flex justify-end gap-2 mt-4">
          <button type="button" onclick={() => isLinkModalOpen = false} class="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
          <button type="button" onclick={confirmLink} class="px-4 py-2 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors shadow-md">Confirm</button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  div[contenteditable]:empty:before {
    content: attr(placeholder);
    color: #9ca3af;
    pointer-events: none;
    display: block;
  }
</style>
