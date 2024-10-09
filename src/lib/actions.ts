import type Quill from 'quill';
import type { QuillOptions } from 'quill';

// Define a dispatch event type for TypeScript

// Create a store to hold the Quill instance
let quillInstance: Quill | null = null;
// import('quill/dist/quill.snow.css');
// import('quill/dist/quill.bubble.css');
// import('quill/dist/quill.core.css');
export const quill = (node: HTMLDivElement, options?: QuillOptions) => {
	let editor: Quill;
	import('quill/dist/quill.core.css');
	import('quill/dist/quill.snow.css');
	import('quill').then(({ default: Quill }) => {
		editor = new Quill(node, {
			...options
		});

		// Store the instance
		quillInstance = editor;

		// Set up event listener for text-change
		editor.on('text-change', () => {
			node.dispatchEvent(
				new CustomEvent('textChange', {
					detail: {
						html: node.querySelector('.ql-editor')?.innerHTML || '',
						text: editor.getText()
					}
				})
			);
		});
	});

	return {
		update(newOptions: QuillOptions) {
			// Handle updates if needed
			options = newOptions;
		},
		destroy() {
			// Cleanup
			quillInstance = null;
		}
	};
};

// Helper function to get content
export function getQuillContent() {
	if (!quillInstance) return { text: '', html: '' };

	return {
		text: quillInstance.getText(),
		html: quillInstance.root.innerHTML
	};
}
