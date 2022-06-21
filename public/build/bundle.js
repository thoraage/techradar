
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign$1(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function is_promise(value) {
        return value && typeof value === 'object' && typeof value.then === 'function';
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign$1($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function compute_slots(slots) {
        const result = {};
        for (const key in slots) {
            result[key] = true;
        }
        return result;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        select.selectedIndex = -1; // no option should be selected
    }
    function select_options(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            option.selected = ~value.indexOf(option.__value);
        }
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function handle_promise(promise, info) {
        const token = info.token = {};
        function update(type, index, key, value) {
            if (info.token !== token)
                return;
            info.resolved = value;
            let child_ctx = info.ctx;
            if (key !== undefined) {
                child_ctx = child_ctx.slice();
                child_ctx[key] = value;
            }
            const block = type && (info.current = type)(child_ctx);
            let needs_flush = false;
            if (info.block) {
                if (info.blocks) {
                    info.blocks.forEach((block, i) => {
                        if (i !== index && block) {
                            group_outros();
                            transition_out(block, 1, 1, () => {
                                if (info.blocks[i] === block) {
                                    info.blocks[i] = null;
                                }
                            });
                            check_outros();
                        }
                    });
                }
                else {
                    info.block.d(1);
                }
                block.c();
                transition_in(block, 1);
                block.m(info.mount(), info.anchor);
                needs_flush = true;
            }
            info.block = block;
            if (info.blocks)
                info.blocks[index] = block;
            if (needs_flush) {
                flush();
            }
        }
        if (is_promise(promise)) {
            const current_component = get_current_component();
            promise.then(value => {
                set_current_component(current_component);
                update(info.then, 1, info.value, value);
                set_current_component(null);
            }, error => {
                set_current_component(current_component);
                update(info.catch, 2, info.error, error);
                set_current_component(null);
                if (!info.hasCatch) {
                    throw error;
                }
            });
            // if we previously had a then/catch block, destroy it
            if (info.current !== info.pending) {
                update(info.pending, 0);
                return true;
            }
        }
        else {
            if (info.current !== info.then) {
                update(info.then, 1, info.value, promise);
                return true;
            }
            info.resolved = promise;
        }
    }
    function update_await_block_branch(info, ctx, dirty) {
        const child_ctx = ctx.slice();
        const { resolved } = info;
        if (info.current === info.then) {
            child_ctx[info.value] = resolved;
        }
        if (info.current === info.catch) {
            child_ctx[info.error] = resolved;
        }
        info.block.p(child_ctx, dirty);
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.48.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    function isObject(value) {
      const type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    function getColumnSizeClass(isXs, colWidth, colSize) {
      if (colSize === true || colSize === '') {
        return isXs ? 'col' : `col-${colWidth}`;
      } else if (colSize === 'auto') {
        return isXs ? 'col-auto' : `col-${colWidth}-auto`;
      }

      return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`;
    }

    function toClassName(value) {
      let result = '';

      if (typeof value === 'string' || typeof value === 'number') {
        result += value;
      } else if (typeof value === 'object') {
        if (Array.isArray(value)) {
          result = value.map(toClassName).filter(Boolean).join(' ');
        } else {
          for (let key in value) {
            if (value[key]) {
              result && (result += ' ');
              result += key;
            }
          }
        }
      }

      return result;
    }

    function classnames(...args) {
      return args.map(toClassName).filter(Boolean).join(' ');
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    /* node_modules/sveltestrap/src/Form.svelte generated by Svelte v3.48.0 */
    const file$7 = "node_modules/sveltestrap/src/Form.svelte";

    function create_fragment$7(ctx) {
    	let form;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let form_levels = [/*$$restProps*/ ctx[1], { class: /*classes*/ ctx[0] }];
    	let form_data = {};

    	for (let i = 0; i < form_levels.length; i += 1) {
    		form_data = assign$1(form_data, form_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			form = element("form");
    			if (default_slot) default_slot.c();
    			set_attributes(form, form_data);
    			add_location(form, file$7, 14, 0, 277);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);

    			if (default_slot) {
    				default_slot.m(form, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(form, "submit", /*submit_handler*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(form, form_data = get_spread_update(form_levels, [
    				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1],
    				(!current || dirty & /*classes*/ 1) && { class: /*classes*/ ctx[0] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["class","inline","validated"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Form', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { inline = false } = $$props;
    	let { validated = false } = $$props;

    	function submit_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign$1(assign$1({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('inline' in $$new_props) $$invalidate(3, inline = $$new_props.inline);
    		if ('validated' in $$new_props) $$invalidate(4, validated = $$new_props.validated);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		inline,
    		validated,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('inline' in $$props) $$invalidate(3, inline = $$new_props.inline);
    		if ('validated' in $$props) $$invalidate(4, validated = $$new_props.validated);
    		if ('classes' in $$props) $$invalidate(0, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, inline, validated*/ 28) {
    			$$invalidate(0, classes = classnames(className, {
    				'form-inline': inline,
    				'was-validated': validated
    			}));
    		}
    	};

    	return [
    		classes,
    		$$restProps,
    		className,
    		inline,
    		validated,
    		$$scope,
    		slots,
    		submit_handler
    	];
    }

    class Form extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { class: 2, inline: 3, validated: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Form",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get class() {
    		throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inline() {
    		throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inline(value) {
    		throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get validated() {
    		throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set validated(value) {
    		throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/sveltestrap/src/FormCheck.svelte generated by Svelte v3.48.0 */
    const file$6 = "node_modules/sveltestrap/src/FormCheck.svelte";
    const get_label_slot_changes$1 = dirty => ({});
    const get_label_slot_context$1 = ctx => ({});

    // (66:2) {:else}
    function create_else_block$2(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[11],
    		{ class: /*inputClasses*/ ctx[9] },
    		{ id: /*idFor*/ ctx[8] },
    		{ type: "checkbox" },
    		{ disabled: /*disabled*/ ctx[3] },
    		{ name: /*name*/ ctx[5] },
    		{ __value: /*value*/ ctx[7] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$6, 66, 4, 1386);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			input.checked = /*checked*/ ctx[0];
    			/*input_binding_2*/ ctx[38](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_2*/ ctx[28], false, false, false),
    					listen_dev(input, "change", /*change_handler_2*/ ctx[29], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_2*/ ctx[30], false, false, false),
    					listen_dev(input, "input", /*input_handler_2*/ ctx[31], false, false, false),
    					listen_dev(input, "change", /*input_change_handler_2*/ ctx[37])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2048 && /*$$restProps*/ ctx[11],
    				dirty[0] & /*inputClasses*/ 512 && { class: /*inputClasses*/ ctx[9] },
    				dirty[0] & /*idFor*/ 256 && { id: /*idFor*/ ctx[8] },
    				{ type: "checkbox" },
    				dirty[0] & /*disabled*/ 8 && { disabled: /*disabled*/ ctx[3] },
    				dirty[0] & /*name*/ 32 && { name: /*name*/ ctx[5] },
    				dirty[0] & /*value*/ 128 && { __value: /*value*/ ctx[7] }
    			]));

    			if (dirty[0] & /*checked*/ 1) {
    				input.checked = /*checked*/ ctx[0];
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_2*/ ctx[38](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(66:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (50:30) 
    function create_if_block_2$2(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[11],
    		{ class: /*inputClasses*/ ctx[9] },
    		{ id: /*idFor*/ ctx[8] },
    		{ type: "checkbox" },
    		{ disabled: /*disabled*/ ctx[3] },
    		{ name: /*name*/ ctx[5] },
    		{ __value: /*value*/ ctx[7] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$6, 50, 4, 1122);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			input.checked = /*checked*/ ctx[0];
    			/*input_binding_1*/ ctx[36](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_1*/ ctx[24], false, false, false),
    					listen_dev(input, "change", /*change_handler_1*/ ctx[25], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_1*/ ctx[26], false, false, false),
    					listen_dev(input, "input", /*input_handler_1*/ ctx[27], false, false, false),
    					listen_dev(input, "change", /*input_change_handler_1*/ ctx[35])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2048 && /*$$restProps*/ ctx[11],
    				dirty[0] & /*inputClasses*/ 512 && { class: /*inputClasses*/ ctx[9] },
    				dirty[0] & /*idFor*/ 256 && { id: /*idFor*/ ctx[8] },
    				{ type: "checkbox" },
    				dirty[0] & /*disabled*/ 8 && { disabled: /*disabled*/ ctx[3] },
    				dirty[0] & /*name*/ 32 && { name: /*name*/ ctx[5] },
    				dirty[0] & /*value*/ 128 && { __value: /*value*/ ctx[7] }
    			]));

    			if (dirty[0] & /*checked*/ 1) {
    				input.checked = /*checked*/ ctx[0];
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_1*/ ctx[36](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(50:30) ",
    		ctx
    	});

    	return block;
    }

    // (34:2) {#if type === 'radio'}
    function create_if_block_1$2(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[11],
    		{ class: /*inputClasses*/ ctx[9] },
    		{ id: /*idFor*/ ctx[8] },
    		{ type: "radio" },
    		{ disabled: /*disabled*/ ctx[3] },
    		{ name: /*name*/ ctx[5] },
    		{ __value: /*value*/ ctx[7] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			/*$$binding_groups*/ ctx[33][0].push(input);
    			add_location(input, file$6, 34, 4, 842);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			input.checked = input.__value === /*group*/ ctx[1];
    			/*input_binding*/ ctx[34](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler*/ ctx[20], false, false, false),
    					listen_dev(input, "change", /*change_handler*/ ctx[21], false, false, false),
    					listen_dev(input, "focus", /*focus_handler*/ ctx[22], false, false, false),
    					listen_dev(input, "input", /*input_handler*/ ctx[23], false, false, false),
    					listen_dev(input, "change", /*input_change_handler*/ ctx[32])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2048 && /*$$restProps*/ ctx[11],
    				dirty[0] & /*inputClasses*/ 512 && { class: /*inputClasses*/ ctx[9] },
    				dirty[0] & /*idFor*/ 256 && { id: /*idFor*/ ctx[8] },
    				{ type: "radio" },
    				dirty[0] & /*disabled*/ 8 && { disabled: /*disabled*/ ctx[3] },
    				dirty[0] & /*name*/ 32 && { name: /*name*/ ctx[5] },
    				dirty[0] & /*value*/ 128 && { __value: /*value*/ ctx[7] }
    			]));

    			if (dirty[0] & /*group*/ 2) {
    				input.checked = input.__value === /*group*/ ctx[1];
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*$$binding_groups*/ ctx[33][0].splice(/*$$binding_groups*/ ctx[33][0].indexOf(input), 1);
    			/*input_binding*/ ctx[34](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(34:2) {#if type === 'radio'}",
    		ctx
    	});

    	return block;
    }

    // (83:2) {#if label}
    function create_if_block$2(ctx) {
    	let label_1;
    	let current;
    	const label_slot_template = /*#slots*/ ctx[19].label;
    	const label_slot = create_slot(label_slot_template, ctx, /*$$scope*/ ctx[18], get_label_slot_context$1);
    	const label_slot_or_fallback = label_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			if (label_slot_or_fallback) label_slot_or_fallback.c();
    			attr_dev(label_1, "class", "form-check-label");
    			attr_dev(label_1, "for", /*idFor*/ ctx[8]);
    			add_location(label_1, file$6, 83, 4, 1662);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);

    			if (label_slot_or_fallback) {
    				label_slot_or_fallback.m(label_1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (label_slot) {
    				if (label_slot.p && (!current || dirty[0] & /*$$scope*/ 262144)) {
    					update_slot_base(
    						label_slot,
    						label_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes(label_slot_template, /*$$scope*/ ctx[18], dirty, get_label_slot_changes$1),
    						get_label_slot_context$1
    					);
    				}
    			} else {
    				if (label_slot_or_fallback && label_slot_or_fallback.p && (!current || dirty[0] & /*label*/ 16)) {
    					label_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}

    			if (!current || dirty[0] & /*idFor*/ 256) {
    				attr_dev(label_1, "for", /*idFor*/ ctx[8]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    			if (label_slot_or_fallback) label_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(83:2) {#if label}",
    		ctx
    	});

    	return block;
    }

    // (85:25) {label}
    function fallback_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*label*/ ctx[4]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*label*/ 16) set_data_dev(t, /*label*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(85:25) {label}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div;
    	let t;
    	let current;

    	function select_block_type(ctx, dirty) {
    		if (/*type*/ ctx[6] === 'radio') return create_if_block_1$2;
    		if (/*type*/ ctx[6] === 'switch') return create_if_block_2$2;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = /*label*/ ctx[4] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			attr_dev(div, "class", /*classes*/ ctx[10]);
    			add_location(div, file$6, 32, 0, 791);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_block0.m(div, null);
    			append_dev(div, t);
    			if (if_block1) if_block1.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div, t);
    				}
    			}

    			if (/*label*/ ctx[4]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*label*/ 16) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$2(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty[0] & /*classes*/ 1024) {
    				attr_dev(div, "class", /*classes*/ ctx[10]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let classes;
    	let inputClasses;
    	let idFor;

    	const omit_props_names = [
    		"class","checked","disabled","group","id","inline","inner","invalid","label","name","size","type","valid","value"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FormCheck', slots, ['label']);
    	let { class: className = '' } = $$props;
    	let { checked = false } = $$props;
    	let { disabled = false } = $$props;
    	let { group = undefined } = $$props;
    	let { id = undefined } = $$props;
    	let { inline = false } = $$props;
    	let { inner = undefined } = $$props;
    	let { invalid = false } = $$props;
    	let { label = '' } = $$props;
    	let { name = '' } = $$props;
    	let { size = '' } = $$props;
    	let { type = 'checkbox' } = $$props;
    	let { valid = false } = $$props;
    	let { value = undefined } = $$props;
    	const $$binding_groups = [[]];

    	function blur_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_change_handler() {
    		group = this.__value;
    		$$invalidate(1, group);
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(2, inner);
    		});
    	}

    	function input_change_handler_1() {
    		checked = this.checked;
    		$$invalidate(0, checked);
    	}

    	function input_binding_1($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(2, inner);
    		});
    	}

    	function input_change_handler_2() {
    		checked = this.checked;
    		$$invalidate(0, checked);
    	}

    	function input_binding_2($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(2, inner);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign$1(assign$1({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(11, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(12, className = $$new_props.class);
    		if ('checked' in $$new_props) $$invalidate(0, checked = $$new_props.checked);
    		if ('disabled' in $$new_props) $$invalidate(3, disabled = $$new_props.disabled);
    		if ('group' in $$new_props) $$invalidate(1, group = $$new_props.group);
    		if ('id' in $$new_props) $$invalidate(13, id = $$new_props.id);
    		if ('inline' in $$new_props) $$invalidate(14, inline = $$new_props.inline);
    		if ('inner' in $$new_props) $$invalidate(2, inner = $$new_props.inner);
    		if ('invalid' in $$new_props) $$invalidate(15, invalid = $$new_props.invalid);
    		if ('label' in $$new_props) $$invalidate(4, label = $$new_props.label);
    		if ('name' in $$new_props) $$invalidate(5, name = $$new_props.name);
    		if ('size' in $$new_props) $$invalidate(16, size = $$new_props.size);
    		if ('type' in $$new_props) $$invalidate(6, type = $$new_props.type);
    		if ('valid' in $$new_props) $$invalidate(17, valid = $$new_props.valid);
    		if ('value' in $$new_props) $$invalidate(7, value = $$new_props.value);
    		if ('$$scope' in $$new_props) $$invalidate(18, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		checked,
    		disabled,
    		group,
    		id,
    		inline,
    		inner,
    		invalid,
    		label,
    		name,
    		size,
    		type,
    		valid,
    		value,
    		idFor,
    		inputClasses,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(12, className = $$new_props.className);
    		if ('checked' in $$props) $$invalidate(0, checked = $$new_props.checked);
    		if ('disabled' in $$props) $$invalidate(3, disabled = $$new_props.disabled);
    		if ('group' in $$props) $$invalidate(1, group = $$new_props.group);
    		if ('id' in $$props) $$invalidate(13, id = $$new_props.id);
    		if ('inline' in $$props) $$invalidate(14, inline = $$new_props.inline);
    		if ('inner' in $$props) $$invalidate(2, inner = $$new_props.inner);
    		if ('invalid' in $$props) $$invalidate(15, invalid = $$new_props.invalid);
    		if ('label' in $$props) $$invalidate(4, label = $$new_props.label);
    		if ('name' in $$props) $$invalidate(5, name = $$new_props.name);
    		if ('size' in $$props) $$invalidate(16, size = $$new_props.size);
    		if ('type' in $$props) $$invalidate(6, type = $$new_props.type);
    		if ('valid' in $$props) $$invalidate(17, valid = $$new_props.valid);
    		if ('value' in $$props) $$invalidate(7, value = $$new_props.value);
    		if ('idFor' in $$props) $$invalidate(8, idFor = $$new_props.idFor);
    		if ('inputClasses' in $$props) $$invalidate(9, inputClasses = $$new_props.inputClasses);
    		if ('classes' in $$props) $$invalidate(10, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*className, type, inline, size*/ 86080) {
    			$$invalidate(10, classes = classnames(className, 'form-check', {
    				'form-switch': type === 'switch',
    				'form-check-inline': inline,
    				[`form-control-${size}`]: size
    			}));
    		}

    		if ($$self.$$.dirty[0] & /*invalid, valid*/ 163840) {
    			$$invalidate(9, inputClasses = classnames('form-check-input', { 'is-invalid': invalid, 'is-valid': valid }));
    		}

    		if ($$self.$$.dirty[0] & /*id, label*/ 8208) {
    			$$invalidate(8, idFor = id || label);
    		}
    	};

    	return [
    		checked,
    		group,
    		inner,
    		disabled,
    		label,
    		name,
    		type,
    		value,
    		idFor,
    		inputClasses,
    		classes,
    		$$restProps,
    		className,
    		id,
    		inline,
    		invalid,
    		size,
    		valid,
    		$$scope,
    		slots,
    		blur_handler,
    		change_handler,
    		focus_handler,
    		input_handler,
    		blur_handler_1,
    		change_handler_1,
    		focus_handler_1,
    		input_handler_1,
    		blur_handler_2,
    		change_handler_2,
    		focus_handler_2,
    		input_handler_2,
    		input_change_handler,
    		$$binding_groups,
    		input_binding,
    		input_change_handler_1,
    		input_binding_1,
    		input_change_handler_2,
    		input_binding_2
    	];
    }

    class FormCheck extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$6,
    			create_fragment$6,
    			safe_not_equal,
    			{
    				class: 12,
    				checked: 0,
    				disabled: 3,
    				group: 1,
    				id: 13,
    				inline: 14,
    				inner: 2,
    				invalid: 15,
    				label: 4,
    				name: 5,
    				size: 16,
    				type: 6,
    				valid: 17,
    				value: 7
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormCheck",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get class() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checked() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get group() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set group(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inline() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inline(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inner() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inner(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get valid() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set valid(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/sveltestrap/src/FormFeedback.svelte generated by Svelte v3.48.0 */
    const file$5 = "node_modules/sveltestrap/src/FormFeedback.svelte";

    function create_fragment$5(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let div_levels = [/*$$restProps*/ ctx[1], { class: /*classes*/ ctx[0] }];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign$1(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$5, 19, 0, 368);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1],
    				(!current || dirty & /*classes*/ 1) && { class: /*classes*/ ctx[0] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	const omit_props_names = ["class","valid","tooltip"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FormFeedback', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { valid = undefined } = $$props;
    	let { tooltip = false } = $$props;
    	let classes;

    	$$self.$$set = $$new_props => {
    		$$props = assign$1(assign$1({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('valid' in $$new_props) $$invalidate(3, valid = $$new_props.valid);
    		if ('tooltip' in $$new_props) $$invalidate(4, tooltip = $$new_props.tooltip);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		valid,
    		tooltip,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('valid' in $$props) $$invalidate(3, valid = $$new_props.valid);
    		if ('tooltip' in $$props) $$invalidate(4, tooltip = $$new_props.tooltip);
    		if ('classes' in $$props) $$invalidate(0, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*tooltip, className, valid*/ 28) {
    			{
    				const validMode = tooltip ? 'tooltip' : 'feedback';
    				$$invalidate(0, classes = classnames(className, valid ? `valid-${validMode}` : `invalid-${validMode}`));
    			}
    		}
    	};

    	return [classes, $$restProps, className, valid, tooltip, $$scope, slots];
    }

    class FormFeedback extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { class: 2, valid: 3, tooltip: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormFeedback",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get class() {
    		throw new Error("<FormFeedback>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<FormFeedback>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get valid() {
    		throw new Error("<FormFeedback>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set valid(value) {
    		throw new Error("<FormFeedback>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tooltip() {
    		throw new Error("<FormFeedback>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tooltip(value) {
    		throw new Error("<FormFeedback>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/sveltestrap/src/FormGroup.svelte generated by Svelte v3.48.0 */
    const file$4 = "node_modules/sveltestrap/src/FormGroup.svelte";
    const get_label_slot_changes_1 = dirty => ({});
    const get_label_slot_context_1 = ctx => ({});
    const get_label_slot_changes = dirty => ({});
    const get_label_slot_context = ctx => ({});

    // (34:0) {:else}
    function create_else_block$1(ctx) {
    	let div;
    	let t;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[12].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);
    	let if_block = (/*label*/ ctx[0] || /*$$slots*/ ctx[4].label) && create_if_block_2$1(ctx);
    	let div_levels = [/*$$restProps*/ ctx[3], { class: /*classes*/ ctx[2] }];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign$1(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			t = space();
    			if (if_block) if_block.c();
    			set_attributes(div, div_data);
    			add_location(div, file$4, 34, 2, 796);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			append_dev(div, t);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}

    			if (/*label*/ ctx[0] || /*$$slots*/ ctx[4].label) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*label, $$slots*/ 17) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_2$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3],
    				(!current || dirty & /*classes*/ 4) && { class: /*classes*/ ctx[2] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(34:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (23:0) {#if tag === 'fieldset'}
    function create_if_block$1(ctx) {
    	let fieldset;
    	let t;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[12].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);
    	let if_block = (/*label*/ ctx[0] || /*$$slots*/ ctx[4].label) && create_if_block_1$1(ctx);
    	let fieldset_levels = [/*$$restProps*/ ctx[3], { class: /*classes*/ ctx[2] }];
    	let fieldset_data = {};

    	for (let i = 0; i < fieldset_levels.length; i += 1) {
    		fieldset_data = assign$1(fieldset_data, fieldset_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			fieldset = element("fieldset");
    			if (default_slot) default_slot.c();
    			t = space();
    			if (if_block) if_block.c();
    			set_attributes(fieldset, fieldset_data);
    			add_location(fieldset, file$4, 23, 2, 534);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, fieldset, anchor);

    			if (default_slot) {
    				default_slot.m(fieldset, null);
    			}

    			append_dev(fieldset, t);
    			if (if_block) if_block.m(fieldset, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}

    			if (/*label*/ ctx[0] || /*$$slots*/ ctx[4].label) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*label, $$slots*/ 17) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(fieldset, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			set_attributes(fieldset, fieldset_data = get_spread_update(fieldset_levels, [
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3],
    				(!current || dirty & /*classes*/ 4) && { class: /*classes*/ ctx[2] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(fieldset);
    			if (default_slot) default_slot.d(detaching);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(23:0) {#if tag === 'fieldset'}",
    		ctx
    	});

    	return block;
    }

    // (37:4) {#if label || $$slots.label}
    function create_if_block_2$1(ctx) {
    	let label_1;
    	let t0;
    	let t1;
    	let current;
    	const label_slot_template = /*#slots*/ ctx[12].label;
    	const label_slot = create_slot(label_slot_template, ctx, /*$$scope*/ ctx[11], get_label_slot_context_1);

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			t0 = text(/*label*/ ctx[0]);
    			t1 = space();
    			if (label_slot) label_slot.c();
    			add_location(label_1, file$4, 38, 6, 950);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, t0);
    			append_dev(label_1, t1);

    			if (label_slot) {
    				label_slot.m(label_1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*label*/ 1) set_data_dev(t0, /*label*/ ctx[0]);

    			if (label_slot) {
    				if (label_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						label_slot,
    						label_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(label_slot_template, /*$$scope*/ ctx[11], dirty, get_label_slot_changes_1),
    						get_label_slot_context_1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    			if (label_slot) label_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(37:4) {#if label || $$slots.label}",
    		ctx
    	});

    	return block;
    }

    // (26:4) {#if label || $$slots.label}
    function create_if_block_1$1(ctx) {
    	let label_1;
    	let t0;
    	let t1;
    	let current;
    	const label_slot_template = /*#slots*/ ctx[12].label;
    	const label_slot = create_slot(label_slot_template, ctx, /*$$scope*/ ctx[11], get_label_slot_context);

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			t0 = text(/*label*/ ctx[0]);
    			t1 = space();
    			if (label_slot) label_slot.c();
    			add_location(label_1, file$4, 27, 6, 693);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, t0);
    			append_dev(label_1, t1);

    			if (label_slot) {
    				label_slot.m(label_1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*label*/ 1) set_data_dev(t0, /*label*/ ctx[0]);

    			if (label_slot) {
    				if (label_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						label_slot,
    						label_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(label_slot_template, /*$$scope*/ ctx[11], dirty, get_label_slot_changes),
    						get_label_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    			if (label_slot) label_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(26:4) {#if label || $$slots.label}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*tag*/ ctx[1] === 'fieldset') return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["class","check","disabled","floating","inline","label","row","tag"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FormGroup', slots, ['default','label']);
    	const $$slots = compute_slots(slots);
    	let { class: className = '' } = $$props;
    	let { check = false } = $$props;
    	let { disabled = false } = $$props;
    	let { floating = false } = $$props;
    	let { inline = false } = $$props;
    	let { label = '' } = $$props;
    	let { row = false } = $$props;
    	let { tag = null } = $$props;

    	$$self.$$set = $$new_props => {
    		$$props = assign$1(assign$1({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(5, className = $$new_props.class);
    		if ('check' in $$new_props) $$invalidate(6, check = $$new_props.check);
    		if ('disabled' in $$new_props) $$invalidate(7, disabled = $$new_props.disabled);
    		if ('floating' in $$new_props) $$invalidate(8, floating = $$new_props.floating);
    		if ('inline' in $$new_props) $$invalidate(9, inline = $$new_props.inline);
    		if ('label' in $$new_props) $$invalidate(0, label = $$new_props.label);
    		if ('row' in $$new_props) $$invalidate(10, row = $$new_props.row);
    		if ('tag' in $$new_props) $$invalidate(1, tag = $$new_props.tag);
    		if ('$$scope' in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		check,
    		disabled,
    		floating,
    		inline,
    		label,
    		row,
    		tag,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(5, className = $$new_props.className);
    		if ('check' in $$props) $$invalidate(6, check = $$new_props.check);
    		if ('disabled' in $$props) $$invalidate(7, disabled = $$new_props.disabled);
    		if ('floating' in $$props) $$invalidate(8, floating = $$new_props.floating);
    		if ('inline' in $$props) $$invalidate(9, inline = $$new_props.inline);
    		if ('label' in $$props) $$invalidate(0, label = $$new_props.label);
    		if ('row' in $$props) $$invalidate(10, row = $$new_props.row);
    		if ('tag' in $$props) $$invalidate(1, tag = $$new_props.tag);
    		if ('classes' in $$props) $$invalidate(2, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, row, check, inline, floating, disabled*/ 2016) {
    			$$invalidate(2, classes = classnames(className, 'mb-3', {
    				row,
    				'form-check': check,
    				'form-check-inline': check && inline,
    				'form-floating': floating,
    				disabled: check && disabled
    			}));
    		}
    	};

    	return [
    		label,
    		tag,
    		classes,
    		$$restProps,
    		$$slots,
    		className,
    		check,
    		disabled,
    		floating,
    		inline,
    		row,
    		$$scope,
    		slots
    	];
    }

    class FormGroup extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			class: 5,
    			check: 6,
    			disabled: 7,
    			floating: 8,
    			inline: 9,
    			label: 0,
    			row: 10,
    			tag: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormGroup",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get class() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get check() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set check(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get floating() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set floating(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inline() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inline(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get row() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set row(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tag() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tag(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/sveltestrap/src/FormText.svelte generated by Svelte v3.48.0 */
    const file$3 = "node_modules/sveltestrap/src/FormText.svelte";

    function create_fragment$3(ctx) {
    	let small;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let small_levels = [/*$$restProps*/ ctx[1], { class: /*classes*/ ctx[0] }];
    	let small_data = {};

    	for (let i = 0; i < small_levels.length; i += 1) {
    		small_data = assign$1(small_data, small_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			small = element("small");
    			if (default_slot) default_slot.c();
    			set_attributes(small, small_data);
    			add_location(small, file$3, 15, 0, 290);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, small, anchor);

    			if (default_slot) {
    				default_slot.m(small, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(small, small_data = get_spread_update(small_levels, [
    				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1],
    				(!current || dirty & /*classes*/ 1) && { class: /*classes*/ ctx[0] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(small);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["class","inline","color"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FormText', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { inline = false } = $$props;
    	let { color = 'muted' } = $$props;

    	$$self.$$set = $$new_props => {
    		$$props = assign$1(assign$1({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('inline' in $$new_props) $$invalidate(3, inline = $$new_props.inline);
    		if ('color' in $$new_props) $$invalidate(4, color = $$new_props.color);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		inline,
    		color,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('inline' in $$props) $$invalidate(3, inline = $$new_props.inline);
    		if ('color' in $$props) $$invalidate(4, color = $$new_props.color);
    		if ('classes' in $$props) $$invalidate(0, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, inline, color*/ 28) {
    			$$invalidate(0, classes = classnames(className, !inline ? 'form-text' : false, color ? `text-${color}` : false));
    		}
    	};

    	return [classes, $$restProps, className, inline, color, $$scope, slots];
    }

    class FormText extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { class: 2, inline: 3, color: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormText",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get class() {
    		throw new Error("<FormText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<FormText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inline() {
    		throw new Error("<FormText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inline(value) {
    		throw new Error("<FormText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<FormText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<FormText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/sveltestrap/src/Input.svelte generated by Svelte v3.48.0 */
    const file$2 = "node_modules/sveltestrap/src/Input.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[210] = list[i];
    	return child_ctx;
    }

    // (490:40) 
    function create_if_block_22(ctx) {
    	let select;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[24].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[209], null);

    	let select_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ name: /*name*/ ctx[13] },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ readonly: /*readonly*/ ctx[15] }
    	];

    	let select_data = {};

    	for (let i = 0; i < select_levels.length; i += 1) {
    		select_data = assign$1(select_data, select_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			select = element("select");
    			if (default_slot) default_slot.c();
    			set_attributes(select, select_data);
    			if (/*value*/ ctx[6] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[207].call(select));
    			add_location(select, file$2, 490, 2, 9190);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, select, anchor);

    			if (default_slot) {
    				default_slot.m(select, null);
    			}

    			(select_data.multiple ? select_options : select_option)(select, select_data.value);
    			if (select.autofocus) select.focus();
    			select_option(select, /*value*/ ctx[6]);
    			/*select_binding*/ ctx[208](select);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "blur", /*blur_handler_20*/ ctx[156], false, false, false),
    					listen_dev(select, "change", /*change_handler_19*/ ctx[157], false, false, false),
    					listen_dev(select, "focus", /*focus_handler_20*/ ctx[158], false, false, false),
    					listen_dev(select, "input", /*input_handler_19*/ ctx[159], false, false, false),
    					listen_dev(select, "change", /*select_change_handler*/ ctx[207])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[6] & /*$$scope*/ 8388608)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[209],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[209])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[209], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(select, select_data = get_spread_update(select_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				(!current || dirty[0] & /*classes*/ 262144) && { class: /*classes*/ ctx[18] },
    				(!current || dirty[0] & /*name*/ 8192) && { name: /*name*/ ctx[13] },
    				(!current || dirty[0] & /*disabled*/ 256) && { disabled: /*disabled*/ ctx[8] },
    				(!current || dirty[0] & /*readonly*/ 32768) && { readonly: /*readonly*/ ctx[15] }
    			]));

    			if (dirty[0] & /*$$restProps, classes, name, disabled, readonly*/ 2400512 && 'value' in select_data) (select_data.multiple ? select_options : select_option)(select, select_data.value);

    			if (dirty[0] & /*value*/ 64) {
    				select_option(select, /*value*/ ctx[6]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(select);
    			if (default_slot) default_slot.d(detaching);
    			/*select_binding*/ ctx[208](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_22.name,
    		type: "if",
    		source: "(490:40) ",
    		ctx
    	});

    	return block;
    }

    // (472:29) 
    function create_if_block_21(ctx) {
    	let textarea;
    	let mounted;
    	let dispose;

    	let textarea_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] }
    	];

    	let textarea_data = {};

    	for (let i = 0; i < textarea_levels.length; i += 1) {
    		textarea_data = assign$1(textarea_data, textarea_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			textarea = element("textarea");
    			set_attributes(textarea, textarea_data);
    			add_location(textarea, file$2, 472, 2, 8899);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, textarea, anchor);
    			if (textarea.autofocus) textarea.focus();
    			set_input_value(textarea, /*value*/ ctx[6]);
    			/*textarea_binding*/ ctx[206](textarea);

    			if (!mounted) {
    				dispose = [
    					listen_dev(textarea, "blur", /*blur_handler_19*/ ctx[149], false, false, false),
    					listen_dev(textarea, "change", /*change_handler_18*/ ctx[150], false, false, false),
    					listen_dev(textarea, "focus", /*focus_handler_19*/ ctx[151], false, false, false),
    					listen_dev(textarea, "input", /*input_handler_18*/ ctx[152], false, false, false),
    					listen_dev(textarea, "keydown", /*keydown_handler_19*/ ctx[153], false, false, false),
    					listen_dev(textarea, "keypress", /*keypress_handler_19*/ ctx[154], false, false, false),
    					listen_dev(textarea, "keyup", /*keyup_handler_19*/ ctx[155], false, false, false),
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[205])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(textarea, textarea_data = get_spread_update(textarea_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(textarea, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(textarea);
    			/*textarea_binding*/ ctx[206](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_21.name,
    		type: "if",
    		source: "(472:29) ",
    		ctx
    	});

    	return block;
    }

    // (93:0) {#if tag === 'input'}
    function create_if_block_2(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;

    	const if_block_creators = [
    		create_if_block_3,
    		create_if_block_4,
    		create_if_block_5,
    		create_if_block_6,
    		create_if_block_7,
    		create_if_block_8,
    		create_if_block_9,
    		create_if_block_10,
    		create_if_block_11,
    		create_if_block_12,
    		create_if_block_13,
    		create_if_block_14,
    		create_if_block_15,
    		create_if_block_16,
    		create_if_block_17,
    		create_if_block_18,
    		create_if_block_19,
    		create_if_block_20,
    		create_else_block_1
    	];

    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*type*/ ctx[16] === 'text') return 0;
    		if (/*type*/ ctx[16] === 'password') return 1;
    		if (/*type*/ ctx[16] === 'color') return 2;
    		if (/*type*/ ctx[16] === 'email') return 3;
    		if (/*type*/ ctx[16] === 'file') return 4;
    		if (/*type*/ ctx[16] === 'checkbox' || /*type*/ ctx[16] === 'radio' || /*type*/ ctx[16] === 'switch') return 5;
    		if (/*type*/ ctx[16] === 'url') return 6;
    		if (/*type*/ ctx[16] === 'number') return 7;
    		if (/*type*/ ctx[16] === 'date') return 8;
    		if (/*type*/ ctx[16] === 'time') return 9;
    		if (/*type*/ ctx[16] === 'datetime') return 10;
    		if (/*type*/ ctx[16] === 'datetime-local') return 11;
    		if (/*type*/ ctx[16] === 'month') return 12;
    		if (/*type*/ ctx[16] === 'color') return 13;
    		if (/*type*/ ctx[16] === 'range') return 14;
    		if (/*type*/ ctx[16] === 'search') return 15;
    		if (/*type*/ ctx[16] === 'tel') return 16;
    		if (/*type*/ ctx[16] === 'week') return 17;
    		return 18;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(93:0) {#if tag === 'input'}",
    		ctx
    	});

    	return block;
    }

    // (453:2) {:else}
    function create_else_block_1(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ type: /*type*/ ctx[16] },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ class: /*classes*/ ctx[18] },
    		{ name: /*name*/ ctx[13] },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ value: /*value*/ ctx[6] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 453, 4, 8568);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			input.value = input_data.value;
    			if (input.autofocus) input.focus();

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_18*/ ctx[144], false, false, false),
    					listen_dev(input, "change", /*handleInput*/ ctx[20], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_18*/ ctx[145], false, false, false),
    					listen_dev(input, "input", /*handleInput*/ ctx[20], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_18*/ ctx[146], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_18*/ ctx[147], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_18*/ ctx[148], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*type*/ 65536 && { type: /*type*/ ctx[16] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*value*/ 64 && input.value !== /*value*/ ctx[6] && { value: /*value*/ ctx[6] }
    			]));

    			if ('value' in input_data) {
    				input.value = input_data.value;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(453:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (434:28) 
    function create_if_block_20(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "week" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 434, 4, 8259);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_16*/ ctx[204](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_17*/ ctx[137], false, false, false),
    					listen_dev(input, "change", /*change_handler_17*/ ctx[138], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_17*/ ctx[139], false, false, false),
    					listen_dev(input, "input", /*input_handler_17*/ ctx[140], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_17*/ ctx[141], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_17*/ ctx[142], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_17*/ ctx[143], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_14*/ ctx[203])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "week" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_16*/ ctx[204](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_20.name,
    		type: "if",
    		source: "(434:28) ",
    		ctx
    	});

    	return block;
    }

    // (414:27) 
    function create_if_block_19(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "tel" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ size: /*size*/ ctx[1] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 414, 4, 7919);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_15*/ ctx[202](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_16*/ ctx[130], false, false, false),
    					listen_dev(input, "change", /*change_handler_16*/ ctx[131], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_16*/ ctx[132], false, false, false),
    					listen_dev(input, "input", /*input_handler_16*/ ctx[133], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_16*/ ctx[134], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_16*/ ctx[135], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_16*/ ctx[136], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_13*/ ctx[201])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "tel" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*size*/ 2 && { size: /*size*/ ctx[1] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_15*/ ctx[202](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_19.name,
    		type: "if",
    		source: "(414:27) ",
    		ctx
    	});

    	return block;
    }

    // (394:30) 
    function create_if_block_18(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "search" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ size: /*size*/ ctx[1] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 394, 4, 7577);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_14*/ ctx[200](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_15*/ ctx[123], false, false, false),
    					listen_dev(input, "change", /*change_handler_15*/ ctx[124], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_15*/ ctx[125], false, false, false),
    					listen_dev(input, "input", /*input_handler_15*/ ctx[126], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_15*/ ctx[127], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_15*/ ctx[128], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_15*/ ctx[129], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_12*/ ctx[199])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "search" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*size*/ 2 && { size: /*size*/ ctx[1] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_14*/ ctx[200](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_18.name,
    		type: "if",
    		source: "(394:30) ",
    		ctx
    	});

    	return block;
    }

    // (375:29) 
    function create_if_block_17(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ type: "range" },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ class: /*classes*/ ctx[18] },
    		{ name: /*name*/ ctx[13] },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ placeholder: /*placeholder*/ ctx[14] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 375, 4, 7246);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_13*/ ctx[198](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_14*/ ctx[116], false, false, false),
    					listen_dev(input, "change", /*change_handler_14*/ ctx[117], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_14*/ ctx[118], false, false, false),
    					listen_dev(input, "input", /*input_handler_14*/ ctx[119], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_14*/ ctx[120], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_14*/ ctx[121], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_14*/ ctx[122], false, false, false),
    					listen_dev(input, "change", /*input_change_input_handler*/ ctx[197]),
    					listen_dev(input, "input", /*input_change_input_handler*/ ctx[197])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				{ type: "range" },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_13*/ ctx[198](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_17.name,
    		type: "if",
    		source: "(375:29) ",
    		ctx
    	});

    	return block;
    }

    // (356:29) 
    function create_if_block_16(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ type: "color" },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ class: /*classes*/ ctx[18] },
    		{ name: /*name*/ ctx[13] },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ placeholder: /*placeholder*/ ctx[14] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 356, 4, 6916);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_12*/ ctx[196](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_13*/ ctx[109], false, false, false),
    					listen_dev(input, "change", /*change_handler_13*/ ctx[110], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_13*/ ctx[111], false, false, false),
    					listen_dev(input, "input", /*input_handler_13*/ ctx[112], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_13*/ ctx[113], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_13*/ ctx[114], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_13*/ ctx[115], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_11*/ ctx[195])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				{ type: "color" },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_12*/ ctx[196](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_16.name,
    		type: "if",
    		source: "(356:29) ",
    		ctx
    	});

    	return block;
    }

    // (337:29) 
    function create_if_block_15(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "month" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 337, 4, 6586);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_11*/ ctx[194](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_12*/ ctx[102], false, false, false),
    					listen_dev(input, "change", /*change_handler_12*/ ctx[103], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_12*/ ctx[104], false, false, false),
    					listen_dev(input, "input", /*input_handler_12*/ ctx[105], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_12*/ ctx[106], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_12*/ ctx[107], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_12*/ ctx[108], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_10*/ ctx[193])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "month" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_11*/ ctx[194](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_15.name,
    		type: "if",
    		source: "(337:29) ",
    		ctx
    	});

    	return block;
    }

    // (318:38) 
    function create_if_block_14(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "datetime-local" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 318, 4, 6247);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_10*/ ctx[192](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_11*/ ctx[95], false, false, false),
    					listen_dev(input, "change", /*change_handler_11*/ ctx[96], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_11*/ ctx[97], false, false, false),
    					listen_dev(input, "input", /*input_handler_11*/ ctx[98], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_11*/ ctx[99], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_11*/ ctx[100], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_11*/ ctx[101], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_9*/ ctx[191])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "datetime-local" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_10*/ ctx[192](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_14.name,
    		type: "if",
    		source: "(318:38) ",
    		ctx
    	});

    	return block;
    }

    // (299:32) 
    function create_if_block_13(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ type: "datetime" },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ class: /*classes*/ ctx[18] },
    		{ name: /*name*/ ctx[13] },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ placeholder: /*placeholder*/ ctx[14] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 299, 4, 5905);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_9*/ ctx[190](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_10*/ ctx[88], false, false, false),
    					listen_dev(input, "change", /*change_handler_10*/ ctx[89], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_10*/ ctx[90], false, false, false),
    					listen_dev(input, "input", /*input_handler_10*/ ctx[91], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_10*/ ctx[92], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_10*/ ctx[93], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_10*/ ctx[94], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_8*/ ctx[189])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				{ type: "datetime" },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_9*/ ctx[190](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_13.name,
    		type: "if",
    		source: "(299:32) ",
    		ctx
    	});

    	return block;
    }

    // (280:28) 
    function create_if_block_12(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "time" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 280, 4, 5573);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_8*/ ctx[188](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_9*/ ctx[81], false, false, false),
    					listen_dev(input, "change", /*change_handler_9*/ ctx[82], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_9*/ ctx[83], false, false, false),
    					listen_dev(input, "input", /*input_handler_9*/ ctx[84], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_9*/ ctx[85], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_9*/ ctx[86], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_9*/ ctx[87], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_7*/ ctx[187])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "time" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_8*/ ctx[188](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_12.name,
    		type: "if",
    		source: "(280:28) ",
    		ctx
    	});

    	return block;
    }

    // (261:28) 
    function create_if_block_11(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "date" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 261, 4, 5245);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_7*/ ctx[186](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_8*/ ctx[74], false, false, false),
    					listen_dev(input, "change", /*change_handler_8*/ ctx[75], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_8*/ ctx[76], false, false, false),
    					listen_dev(input, "input", /*input_handler_8*/ ctx[77], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_8*/ ctx[78], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_8*/ ctx[79], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_8*/ ctx[80], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_6*/ ctx[185])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "date" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_7*/ ctx[186](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_11.name,
    		type: "if",
    		source: "(261:28) ",
    		ctx
    	});

    	return block;
    }

    // (242:30) 
    function create_if_block_10(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "number" },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ name: /*name*/ ctx[13] },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ placeholder: /*placeholder*/ ctx[14] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 242, 4, 4915);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_6*/ ctx[184](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_7*/ ctx[67], false, false, false),
    					listen_dev(input, "change", /*change_handler_7*/ ctx[68], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_7*/ ctx[69], false, false, false),
    					listen_dev(input, "input", /*input_handler_7*/ ctx[70], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_7*/ ctx[71], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_7*/ ctx[72], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_7*/ ctx[73], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_5*/ ctx[183])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "number" },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] }
    			]));

    			if (dirty[0] & /*value*/ 64 && to_number(input.value) !== /*value*/ ctx[6]) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_6*/ ctx[184](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_10.name,
    		type: "if",
    		source: "(242:30) ",
    		ctx
    	});

    	return block;
    }

    // (222:27) 
    function create_if_block_9(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "url" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ size: /*size*/ ctx[1] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 222, 4, 4573);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_5*/ ctx[182](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_6*/ ctx[60], false, false, false),
    					listen_dev(input, "change", /*change_handler_6*/ ctx[61], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_6*/ ctx[62], false, false, false),
    					listen_dev(input, "input", /*input_handler_6*/ ctx[63], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_6*/ ctx[64], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_6*/ ctx[65], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_6*/ ctx[66], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_4*/ ctx[181])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "url" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*size*/ 2 && { size: /*size*/ ctx[1] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_5*/ ctx[182](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(222:27) ",
    		ctx
    	});

    	return block;
    }

    // (197:73) 
    function create_if_block_8(ctx) {
    	let formcheck;
    	let updating_checked;
    	let updating_inner;
    	let updating_group;
    	let updating_value;
    	let current;

    	const formcheck_spread_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*className*/ ctx[7] },
    		{ size: /*bsSize*/ ctx[0] },
    		{ type: /*type*/ ctx[16] },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ invalid: /*invalid*/ ctx[10] },
    		{ label: /*label*/ ctx[11] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readonly: /*readonly*/ ctx[15] },
    		{ valid: /*valid*/ ctx[17] }
    	];

    	function formcheck_checked_binding(value) {
    		/*formcheck_checked_binding*/ ctx[170](value);
    	}

    	function formcheck_inner_binding(value) {
    		/*formcheck_inner_binding*/ ctx[171](value);
    	}

    	function formcheck_group_binding(value) {
    		/*formcheck_group_binding*/ ctx[172](value);
    	}

    	function formcheck_value_binding(value) {
    		/*formcheck_value_binding*/ ctx[173](value);
    	}

    	let formcheck_props = {};

    	for (let i = 0; i < formcheck_spread_levels.length; i += 1) {
    		formcheck_props = assign$1(formcheck_props, formcheck_spread_levels[i]);
    	}

    	if (/*checked*/ ctx[2] !== void 0) {
    		formcheck_props.checked = /*checked*/ ctx[2];
    	}

    	if (/*inner*/ ctx[5] !== void 0) {
    		formcheck_props.inner = /*inner*/ ctx[5];
    	}

    	if (/*group*/ ctx[4] !== void 0) {
    		formcheck_props.group = /*group*/ ctx[4];
    	}

    	if (/*value*/ ctx[6] !== void 0) {
    		formcheck_props.value = /*value*/ ctx[6];
    	}

    	formcheck = new FormCheck({ props: formcheck_props, $$inline: true });
    	binding_callbacks.push(() => bind(formcheck, 'checked', formcheck_checked_binding));
    	binding_callbacks.push(() => bind(formcheck, 'inner', formcheck_inner_binding));
    	binding_callbacks.push(() => bind(formcheck, 'group', formcheck_group_binding));
    	binding_callbacks.push(() => bind(formcheck, 'value', formcheck_value_binding));
    	formcheck.$on("blur", /*blur_handler_5*/ ctx[174]);
    	formcheck.$on("change", /*change_handler_5*/ ctx[175]);
    	formcheck.$on("focus", /*focus_handler_5*/ ctx[176]);
    	formcheck.$on("input", /*input_handler_5*/ ctx[177]);
    	formcheck.$on("keydown", /*keydown_handler_5*/ ctx[178]);
    	formcheck.$on("keypress", /*keypress_handler_5*/ ctx[179]);
    	formcheck.$on("keyup", /*keyup_handler_5*/ ctx[180]);

    	const block = {
    		c: function create() {
    			create_component(formcheck.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formcheck, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formcheck_changes = (dirty[0] & /*$$restProps, className, bsSize, type, disabled, invalid, label, name, placeholder, readonly, valid*/ 2354561)
    			? get_spread_update(formcheck_spread_levels, [
    					dirty[0] & /*$$restProps*/ 2097152 && get_spread_object(/*$$restProps*/ ctx[21]),
    					dirty[0] & /*className*/ 128 && { class: /*className*/ ctx[7] },
    					dirty[0] & /*bsSize*/ 1 && { size: /*bsSize*/ ctx[0] },
    					dirty[0] & /*type*/ 65536 && { type: /*type*/ ctx[16] },
    					dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    					dirty[0] & /*invalid*/ 1024 && { invalid: /*invalid*/ ctx[10] },
    					dirty[0] & /*label*/ 2048 && { label: /*label*/ ctx[11] },
    					dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    					dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    					dirty[0] & /*readonly*/ 32768 && { readonly: /*readonly*/ ctx[15] },
    					dirty[0] & /*valid*/ 131072 && { valid: /*valid*/ ctx[17] }
    				])
    			: {};

    			if (!updating_checked && dirty[0] & /*checked*/ 4) {
    				updating_checked = true;
    				formcheck_changes.checked = /*checked*/ ctx[2];
    				add_flush_callback(() => updating_checked = false);
    			}

    			if (!updating_inner && dirty[0] & /*inner*/ 32) {
    				updating_inner = true;
    				formcheck_changes.inner = /*inner*/ ctx[5];
    				add_flush_callback(() => updating_inner = false);
    			}

    			if (!updating_group && dirty[0] & /*group*/ 16) {
    				updating_group = true;
    				formcheck_changes.group = /*group*/ ctx[4];
    				add_flush_callback(() => updating_group = false);
    			}

    			if (!updating_value && dirty[0] & /*value*/ 64) {
    				updating_value = true;
    				formcheck_changes.value = /*value*/ ctx[6];
    				add_flush_callback(() => updating_value = false);
    			}

    			formcheck.$set(formcheck_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formcheck.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formcheck.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formcheck, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(197:73) ",
    		ctx
    	});

    	return block;
    }

    // (174:28) 
    function create_if_block_7(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "file" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ invalid: /*invalid*/ ctx[10] },
    		{ multiple: /*multiple*/ ctx[12] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ valid: /*valid*/ ctx[17] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 174, 4, 3715);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			/*input_binding_4*/ ctx[169](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_4*/ ctx[53], false, false, false),
    					listen_dev(input, "change", /*change_handler_4*/ ctx[54], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_4*/ ctx[55], false, false, false),
    					listen_dev(input, "input", /*input_handler_4*/ ctx[56], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_4*/ ctx[57], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_4*/ ctx[58], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_4*/ ctx[59], false, false, false),
    					listen_dev(input, "change", /*input_change_handler*/ ctx[168])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "file" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*invalid*/ 1024 && { invalid: /*invalid*/ ctx[10] },
    				dirty[0] & /*multiple*/ 4096 && { multiple: /*multiple*/ ctx[12] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*valid*/ 131072 && { valid: /*valid*/ ctx[17] }
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_4*/ ctx[169](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(174:28) ",
    		ctx
    	});

    	return block;
    }

    // (153:29) 
    function create_if_block_6(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "email" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ multiple: /*multiple*/ ctx[12] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ size: /*size*/ ctx[1] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 153, 4, 3356);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_3*/ ctx[167](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_3*/ ctx[46], false, false, false),
    					listen_dev(input, "change", /*change_handler_3*/ ctx[47], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_3*/ ctx[48], false, false, false),
    					listen_dev(input, "input", /*input_handler_3*/ ctx[49], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_3*/ ctx[50], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_3*/ ctx[51], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_3*/ ctx[52], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_3*/ ctx[166])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "email" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*multiple*/ 4096 && { multiple: /*multiple*/ ctx[12] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*size*/ 2 && { size: /*size*/ ctx[1] }
    			]));

    			if (dirty[0] & /*value*/ 64 && input.value !== /*value*/ ctx[6]) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_3*/ ctx[167](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(153:29) ",
    		ctx
    	});

    	return block;
    }

    // (134:29) 
    function create_if_block_5(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "color" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 134, 4, 3026);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_2*/ ctx[165](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_2*/ ctx[39], false, false, false),
    					listen_dev(input, "change", /*change_handler_2*/ ctx[40], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_2*/ ctx[41], false, false, false),
    					listen_dev(input, "input", /*input_handler_2*/ ctx[42], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_2*/ ctx[43], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_2*/ ctx[44], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_2*/ ctx[45], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_2*/ ctx[164])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "color" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_2*/ ctx[165](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(134:29) ",
    		ctx
    	});

    	return block;
    }

    // (114:32) 
    function create_if_block_4(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "password" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ size: /*size*/ ctx[1] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 114, 4, 2680);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_1*/ ctx[163](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_1*/ ctx[32], false, false, false),
    					listen_dev(input, "change", /*change_handler_1*/ ctx[33], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_1*/ ctx[34], false, false, false),
    					listen_dev(input, "input", /*input_handler_1*/ ctx[35], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_1*/ ctx[36], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_1*/ ctx[37], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_1*/ ctx[38], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_1*/ ctx[162])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "password" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*size*/ 2 && { size: /*size*/ ctx[1] }
    			]));

    			if (dirty[0] & /*value*/ 64 && input.value !== /*value*/ ctx[6]) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_1*/ ctx[163](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(114:32) ",
    		ctx
    	});

    	return block;
    }

    // (94:2) {#if type === 'text'}
    function create_if_block_3(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "text" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ size: /*size*/ ctx[1] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign$1(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$2, 94, 4, 2335);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding*/ ctx[161](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler*/ ctx[25], false, false, false),
    					listen_dev(input, "change", /*change_handler*/ ctx[26], false, false, false),
    					listen_dev(input, "focus", /*focus_handler*/ ctx[27], false, false, false),
    					listen_dev(input, "input", /*input_handler*/ ctx[28], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler*/ ctx[29], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler*/ ctx[30], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler*/ ctx[31], false, false, false),
    					listen_dev(input, "input", /*input_input_handler*/ ctx[160])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "text" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*size*/ 2 && { size: /*size*/ ctx[1] }
    			]));

    			if (dirty[0] & /*value*/ 64 && input.value !== /*value*/ ctx[6]) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding*/ ctx[161](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(94:2) {#if type === 'text'}",
    		ctx
    	});

    	return block;
    }

    // (523:0) {#if feedback}
    function create_if_block(ctx) {
    	let show_if;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type_2(ctx, dirty) {
    		if (dirty[0] & /*feedback*/ 512) show_if = null;
    		if (show_if == null) show_if = !!Array.isArray(/*feedback*/ ctx[9]);
    		if (show_if) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_2(ctx, [-1, -1, -1, -1, -1, -1, -1]);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_2(ctx, dirty);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(523:0) {#if feedback}",
    		ctx
    	});

    	return block;
    }

    // (528:2) {:else}
    function create_else_block(ctx) {
    	let formfeedback;
    	let current;

    	formfeedback = new FormFeedback({
    			props: {
    				valid: /*valid*/ ctx[17],
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formfeedback.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formfeedback, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formfeedback_changes = {};
    			if (dirty[0] & /*valid*/ 131072) formfeedback_changes.valid = /*valid*/ ctx[17];

    			if (dirty[0] & /*feedback*/ 512 | dirty[6] & /*$$scope*/ 8388608) {
    				formfeedback_changes.$$scope = { dirty, ctx };
    			}

    			formfeedback.$set(formfeedback_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formfeedback.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formfeedback.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formfeedback, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(528:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (524:2) {#if Array.isArray(feedback)}
    function create_if_block_1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*feedback*/ ctx[9];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*valid, feedback*/ 131584) {
    				each_value = /*feedback*/ ctx[9];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(524:2) {#if Array.isArray(feedback)}",
    		ctx
    	});

    	return block;
    }

    // (529:4) <FormFeedback {valid}>
    function create_default_slot_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*feedback*/ ctx[9]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*feedback*/ 512) set_data_dev(t, /*feedback*/ ctx[9]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(529:4) <FormFeedback {valid}>",
    		ctx
    	});

    	return block;
    }

    // (526:6) <FormFeedback {valid}>
    function create_default_slot$1(ctx) {
    	let t_value = /*msg*/ ctx[210] + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*feedback*/ 512 && t_value !== (t_value = /*msg*/ ctx[210] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(526:6) <FormFeedback {valid}>",
    		ctx
    	});

    	return block;
    }

    // (525:4) {#each feedback as msg}
    function create_each_block$1(ctx) {
    	let formfeedback;
    	let current;

    	formfeedback = new FormFeedback({
    			props: {
    				valid: /*valid*/ ctx[17],
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formfeedback.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formfeedback, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formfeedback_changes = {};
    			if (dirty[0] & /*valid*/ 131072) formfeedback_changes.valid = /*valid*/ ctx[17];

    			if (dirty[0] & /*feedback*/ 512 | dirty[6] & /*$$scope*/ 8388608) {
    				formfeedback_changes.$$scope = { dirty, ctx };
    			}

    			formfeedback.$set(formfeedback_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formfeedback.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formfeedback.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formfeedback, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(525:4) {#each feedback as msg}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let current_block_type_index;
    	let if_block0;
    	let t;
    	let if_block1_anchor;
    	let current;
    	const if_block_creators = [create_if_block_2, create_if_block_21, create_if_block_22];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*tag*/ ctx[19] === 'input') return 0;
    		if (/*tag*/ ctx[19] === 'textarea') return 1;
    		if (/*tag*/ ctx[19] === 'select' && !/*multiple*/ ctx[12]) return 2;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	let if_block1 = /*feedback*/ ctx[9] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, t, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block0) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block0 = if_blocks[current_block_type_index];

    					if (!if_block0) {
    						if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block0.c();
    					} else {
    						if_block0.p(ctx, dirty);
    					}

    					transition_in(if_block0, 1);
    					if_block0.m(t.parentNode, t);
    				} else {
    					if_block0 = null;
    				}
    			}

    			if (/*feedback*/ ctx[9]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*feedback*/ 512) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(t);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"class","bsSize","checked","color","disabled","feedback","files","group","inner","invalid","label","multiple","name","placeholder","plaintext","readonly","size","type","valid","value"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Input', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { bsSize = undefined } = $$props;
    	let { checked = false } = $$props;
    	let { color = undefined } = $$props;
    	let { disabled = undefined } = $$props;
    	let { feedback = undefined } = $$props;
    	let { files = undefined } = $$props;
    	let { group = undefined } = $$props;
    	let { inner = undefined } = $$props;
    	let { invalid = false } = $$props;
    	let { label = undefined } = $$props;
    	let { multiple = undefined } = $$props;
    	let { name = '' } = $$props;
    	let { placeholder = '' } = $$props;
    	let { plaintext = false } = $$props;
    	let { readonly = undefined } = $$props;
    	let { size = undefined } = $$props;
    	let { type = 'text' } = $$props;
    	let { valid = false } = $$props;
    	let { value = '' } = $$props;
    	let classes;
    	let tag;

    	const handleInput = event => {
    		$$invalidate(6, value = event.target.value);
    	};

    	function blur_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_3(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_3(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_3(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_3(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_3(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_3(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_3(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_4(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_4(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_4(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_4(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_4(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_4(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_4(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_6(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_6(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_6(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_6(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_6(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_6(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_6(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_7(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_7(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_7(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_7(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_7(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_7(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_7(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_8(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_8(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_8(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_8(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_8(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_8(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_8(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_9(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_9(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_9(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_9(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_9(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_9(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_9(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_10(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_10(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_10(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_10(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_10(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_10(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_10(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_11(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_11(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_11(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_11(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_11(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_11(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_11(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_12(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_12(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_12(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_12(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_12(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_12(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_12(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_13(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_13(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_13(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_13(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_13(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_13(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_13(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_14(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_14(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_14(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_14(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_14(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_14(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_14(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_15(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_15(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_15(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_15(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_15(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_15(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_15(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_16(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_16(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_16(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_16(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_16(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_16(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_16(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_17(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_17(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_17(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_17(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_17(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_17(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_17(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_18(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_18(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_18(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_18(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_18(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_19(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_18(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_19(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_18(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_19(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_19(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_19(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_20(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_19(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_20(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_19(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_input_handler() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_1() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_1($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_2() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_2($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_3() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_3($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_change_handler() {
    		files = this.files;
    		value = this.value;
    		$$invalidate(3, files);
    		$$invalidate(6, value);
    	}

    	function input_binding_4($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function formcheck_checked_binding(value) {
    		checked = value;
    		$$invalidate(2, checked);
    	}

    	function formcheck_inner_binding(value) {
    		inner = value;
    		$$invalidate(5, inner);
    	}

    	function formcheck_group_binding(value) {
    		group = value;
    		$$invalidate(4, group);
    	}

    	function formcheck_value_binding(value$1) {
    		value = value$1;
    		$$invalidate(6, value);
    	}

    	function blur_handler_5(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_5(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_5(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_5(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_5(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_5(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_5(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_input_handler_4() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_5($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_5() {
    		value = to_number(this.value);
    		$$invalidate(6, value);
    	}

    	function input_binding_6($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_6() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_7($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_7() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_8($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_8() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_9($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_9() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_10($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_10() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_11($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_11() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_12($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_change_input_handler() {
    		value = to_number(this.value);
    		$$invalidate(6, value);
    	}

    	function input_binding_13($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_12() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_14($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_13() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_15($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_14() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_16($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function textarea_input_handler() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function textarea_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function select_change_handler() {
    		value = select_value(this);
    		$$invalidate(6, value);
    	}

    	function select_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign$1(assign$1({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(21, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(7, className = $$new_props.class);
    		if ('bsSize' in $$new_props) $$invalidate(0, bsSize = $$new_props.bsSize);
    		if ('checked' in $$new_props) $$invalidate(2, checked = $$new_props.checked);
    		if ('color' in $$new_props) $$invalidate(22, color = $$new_props.color);
    		if ('disabled' in $$new_props) $$invalidate(8, disabled = $$new_props.disabled);
    		if ('feedback' in $$new_props) $$invalidate(9, feedback = $$new_props.feedback);
    		if ('files' in $$new_props) $$invalidate(3, files = $$new_props.files);
    		if ('group' in $$new_props) $$invalidate(4, group = $$new_props.group);
    		if ('inner' in $$new_props) $$invalidate(5, inner = $$new_props.inner);
    		if ('invalid' in $$new_props) $$invalidate(10, invalid = $$new_props.invalid);
    		if ('label' in $$new_props) $$invalidate(11, label = $$new_props.label);
    		if ('multiple' in $$new_props) $$invalidate(12, multiple = $$new_props.multiple);
    		if ('name' in $$new_props) $$invalidate(13, name = $$new_props.name);
    		if ('placeholder' in $$new_props) $$invalidate(14, placeholder = $$new_props.placeholder);
    		if ('plaintext' in $$new_props) $$invalidate(23, plaintext = $$new_props.plaintext);
    		if ('readonly' in $$new_props) $$invalidate(15, readonly = $$new_props.readonly);
    		if ('size' in $$new_props) $$invalidate(1, size = $$new_props.size);
    		if ('type' in $$new_props) $$invalidate(16, type = $$new_props.type);
    		if ('valid' in $$new_props) $$invalidate(17, valid = $$new_props.valid);
    		if ('value' in $$new_props) $$invalidate(6, value = $$new_props.value);
    		if ('$$scope' in $$new_props) $$invalidate(209, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		FormCheck,
    		FormFeedback,
    		classnames,
    		className,
    		bsSize,
    		checked,
    		color,
    		disabled,
    		feedback,
    		files,
    		group,
    		inner,
    		invalid,
    		label,
    		multiple,
    		name,
    		placeholder,
    		plaintext,
    		readonly,
    		size,
    		type,
    		valid,
    		value,
    		classes,
    		tag,
    		handleInput
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(7, className = $$new_props.className);
    		if ('bsSize' in $$props) $$invalidate(0, bsSize = $$new_props.bsSize);
    		if ('checked' in $$props) $$invalidate(2, checked = $$new_props.checked);
    		if ('color' in $$props) $$invalidate(22, color = $$new_props.color);
    		if ('disabled' in $$props) $$invalidate(8, disabled = $$new_props.disabled);
    		if ('feedback' in $$props) $$invalidate(9, feedback = $$new_props.feedback);
    		if ('files' in $$props) $$invalidate(3, files = $$new_props.files);
    		if ('group' in $$props) $$invalidate(4, group = $$new_props.group);
    		if ('inner' in $$props) $$invalidate(5, inner = $$new_props.inner);
    		if ('invalid' in $$props) $$invalidate(10, invalid = $$new_props.invalid);
    		if ('label' in $$props) $$invalidate(11, label = $$new_props.label);
    		if ('multiple' in $$props) $$invalidate(12, multiple = $$new_props.multiple);
    		if ('name' in $$props) $$invalidate(13, name = $$new_props.name);
    		if ('placeholder' in $$props) $$invalidate(14, placeholder = $$new_props.placeholder);
    		if ('plaintext' in $$props) $$invalidate(23, plaintext = $$new_props.plaintext);
    		if ('readonly' in $$props) $$invalidate(15, readonly = $$new_props.readonly);
    		if ('size' in $$props) $$invalidate(1, size = $$new_props.size);
    		if ('type' in $$props) $$invalidate(16, type = $$new_props.type);
    		if ('valid' in $$props) $$invalidate(17, valid = $$new_props.valid);
    		if ('value' in $$props) $$invalidate(6, value = $$new_props.value);
    		if ('classes' in $$props) $$invalidate(18, classes = $$new_props.classes);
    		if ('tag' in $$props) $$invalidate(19, tag = $$new_props.tag);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*type, color, plaintext, size, className, invalid, valid, bsSize*/ 12780675) {
    			{
    				const isNotaNumber = new RegExp('\\D', 'g');
    				let isBtn = false;
    				let formControlClass = 'form-control';
    				$$invalidate(19, tag = 'input');

    				switch (type) {
    					case 'color':
    						formControlClass = `form-control form-control-color`;
    						break;
    					case 'range':
    						formControlClass = 'form-range';
    						break;
    					case 'select':
    						formControlClass = `form-select`;
    						$$invalidate(19, tag = 'select');
    						break;
    					case 'textarea':
    						$$invalidate(19, tag = 'textarea');
    						break;
    					case 'button':
    					case 'reset':
    					case 'submit':
    						formControlClass = `btn btn-${color || 'secondary'}`;
    						isBtn = true;
    						break;
    					case 'hidden':
    					case 'image':
    						formControlClass = undefined;
    						break;
    					default:
    						formControlClass = 'form-control';
    						$$invalidate(19, tag = 'input');
    				}

    				if (plaintext) {
    					formControlClass = `${formControlClass}-plaintext`;
    					$$invalidate(19, tag = 'input');
    				}

    				if (size && isNotaNumber.test(size)) {
    					console.warn('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.');
    					$$invalidate(0, bsSize = size);
    					$$invalidate(1, size = undefined);
    				}

    				$$invalidate(18, classes = classnames(className, formControlClass, {
    					'is-invalid': invalid,
    					'is-valid': valid,
    					[`form-control-${bsSize}`]: bsSize && !isBtn,
    					[`btn-${bsSize}`]: bsSize && isBtn
    				}));
    			}
    		}
    	};

    	return [
    		bsSize,
    		size,
    		checked,
    		files,
    		group,
    		inner,
    		value,
    		className,
    		disabled,
    		feedback,
    		invalid,
    		label,
    		multiple,
    		name,
    		placeholder,
    		readonly,
    		type,
    		valid,
    		classes,
    		tag,
    		handleInput,
    		$$restProps,
    		color,
    		plaintext,
    		slots,
    		blur_handler,
    		change_handler,
    		focus_handler,
    		input_handler,
    		keydown_handler,
    		keypress_handler,
    		keyup_handler,
    		blur_handler_1,
    		change_handler_1,
    		focus_handler_1,
    		input_handler_1,
    		keydown_handler_1,
    		keypress_handler_1,
    		keyup_handler_1,
    		blur_handler_2,
    		change_handler_2,
    		focus_handler_2,
    		input_handler_2,
    		keydown_handler_2,
    		keypress_handler_2,
    		keyup_handler_2,
    		blur_handler_3,
    		change_handler_3,
    		focus_handler_3,
    		input_handler_3,
    		keydown_handler_3,
    		keypress_handler_3,
    		keyup_handler_3,
    		blur_handler_4,
    		change_handler_4,
    		focus_handler_4,
    		input_handler_4,
    		keydown_handler_4,
    		keypress_handler_4,
    		keyup_handler_4,
    		blur_handler_6,
    		change_handler_6,
    		focus_handler_6,
    		input_handler_6,
    		keydown_handler_6,
    		keypress_handler_6,
    		keyup_handler_6,
    		blur_handler_7,
    		change_handler_7,
    		focus_handler_7,
    		input_handler_7,
    		keydown_handler_7,
    		keypress_handler_7,
    		keyup_handler_7,
    		blur_handler_8,
    		change_handler_8,
    		focus_handler_8,
    		input_handler_8,
    		keydown_handler_8,
    		keypress_handler_8,
    		keyup_handler_8,
    		blur_handler_9,
    		change_handler_9,
    		focus_handler_9,
    		input_handler_9,
    		keydown_handler_9,
    		keypress_handler_9,
    		keyup_handler_9,
    		blur_handler_10,
    		change_handler_10,
    		focus_handler_10,
    		input_handler_10,
    		keydown_handler_10,
    		keypress_handler_10,
    		keyup_handler_10,
    		blur_handler_11,
    		change_handler_11,
    		focus_handler_11,
    		input_handler_11,
    		keydown_handler_11,
    		keypress_handler_11,
    		keyup_handler_11,
    		blur_handler_12,
    		change_handler_12,
    		focus_handler_12,
    		input_handler_12,
    		keydown_handler_12,
    		keypress_handler_12,
    		keyup_handler_12,
    		blur_handler_13,
    		change_handler_13,
    		focus_handler_13,
    		input_handler_13,
    		keydown_handler_13,
    		keypress_handler_13,
    		keyup_handler_13,
    		blur_handler_14,
    		change_handler_14,
    		focus_handler_14,
    		input_handler_14,
    		keydown_handler_14,
    		keypress_handler_14,
    		keyup_handler_14,
    		blur_handler_15,
    		change_handler_15,
    		focus_handler_15,
    		input_handler_15,
    		keydown_handler_15,
    		keypress_handler_15,
    		keyup_handler_15,
    		blur_handler_16,
    		change_handler_16,
    		focus_handler_16,
    		input_handler_16,
    		keydown_handler_16,
    		keypress_handler_16,
    		keyup_handler_16,
    		blur_handler_17,
    		change_handler_17,
    		focus_handler_17,
    		input_handler_17,
    		keydown_handler_17,
    		keypress_handler_17,
    		keyup_handler_17,
    		blur_handler_18,
    		focus_handler_18,
    		keydown_handler_18,
    		keypress_handler_18,
    		keyup_handler_18,
    		blur_handler_19,
    		change_handler_18,
    		focus_handler_19,
    		input_handler_18,
    		keydown_handler_19,
    		keypress_handler_19,
    		keyup_handler_19,
    		blur_handler_20,
    		change_handler_19,
    		focus_handler_20,
    		input_handler_19,
    		input_input_handler,
    		input_binding,
    		input_input_handler_1,
    		input_binding_1,
    		input_input_handler_2,
    		input_binding_2,
    		input_input_handler_3,
    		input_binding_3,
    		input_change_handler,
    		input_binding_4,
    		formcheck_checked_binding,
    		formcheck_inner_binding,
    		formcheck_group_binding,
    		formcheck_value_binding,
    		blur_handler_5,
    		change_handler_5,
    		focus_handler_5,
    		input_handler_5,
    		keydown_handler_5,
    		keypress_handler_5,
    		keyup_handler_5,
    		input_input_handler_4,
    		input_binding_5,
    		input_input_handler_5,
    		input_binding_6,
    		input_input_handler_6,
    		input_binding_7,
    		input_input_handler_7,
    		input_binding_8,
    		input_input_handler_8,
    		input_binding_9,
    		input_input_handler_9,
    		input_binding_10,
    		input_input_handler_10,
    		input_binding_11,
    		input_input_handler_11,
    		input_binding_12,
    		input_change_input_handler,
    		input_binding_13,
    		input_input_handler_12,
    		input_binding_14,
    		input_input_handler_13,
    		input_binding_15,
    		input_input_handler_14,
    		input_binding_16,
    		textarea_input_handler,
    		textarea_binding,
    		select_change_handler,
    		select_binding,
    		$$scope
    	];
    }

    class Input extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$2,
    			create_fragment$2,
    			safe_not_equal,
    			{
    				class: 7,
    				bsSize: 0,
    				checked: 2,
    				color: 22,
    				disabled: 8,
    				feedback: 9,
    				files: 3,
    				group: 4,
    				inner: 5,
    				invalid: 10,
    				label: 11,
    				multiple: 12,
    				name: 13,
    				placeholder: 14,
    				plaintext: 23,
    				readonly: 15,
    				size: 1,
    				type: 16,
    				valid: 17,
    				value: 6
    			},
    			null,
    			[-1, -1, -1, -1, -1, -1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Input",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get class() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bsSize() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bsSize(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checked() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get feedback() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set feedback(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get files() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set files(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get group() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set group(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inner() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inner(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get multiple() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set multiple(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get plaintext() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set plaintext(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get readonly() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set readonly(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get valid() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set valid(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/sveltestrap/src/Label.svelte generated by Svelte v3.48.0 */
    const file$1 = "node_modules/sveltestrap/src/Label.svelte";

    function create_fragment$1(ctx) {
    	let label;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[15].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], null);

    	let label_levels = [
    		/*$$restProps*/ ctx[2],
    		{ class: /*classes*/ ctx[1] },
    		{ for: /*fore*/ ctx[0] }
    	];

    	let label_data = {};

    	for (let i = 0; i < label_levels.length; i += 1) {
    		label_data = assign$1(label_data, label_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			label = element("label");
    			if (default_slot) default_slot.c();
    			set_attributes(label, label_data);
    			add_location(label, file$1, 71, 0, 1672);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);

    			if (default_slot) {
    				default_slot.m(label, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16384)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[14],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[14], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(label, label_data = get_spread_update(label_levels, [
    				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2],
    				(!current || dirty & /*classes*/ 2) && { class: /*classes*/ ctx[1] },
    				(!current || dirty & /*fore*/ 1) && { for: /*fore*/ ctx[0] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["class","hidden","check","size","for","xs","sm","md","lg","xl","xxl","widths"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Label', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { hidden = false } = $$props;
    	let { check = false } = $$props;
    	let { size = '' } = $$props;
    	let { for: fore = null } = $$props;
    	let { xs = '' } = $$props;
    	let { sm = '' } = $$props;
    	let { md = '' } = $$props;
    	let { lg = '' } = $$props;
    	let { xl = '' } = $$props;
    	let { xxl = '' } = $$props;
    	const colWidths = { xs, sm, md, lg, xl, xxl };
    	let { widths = Object.keys(colWidths) } = $$props;
    	const colClasses = [];

    	widths.forEach(colWidth => {
    		let columnProp = $$props[colWidth];

    		if (!columnProp && columnProp !== '') {
    			return;
    		}

    		const isXs = colWidth === 'xs';
    		let colClass;

    		if (isObject(columnProp)) {
    			const colSizeInterfix = isXs ? '-' : `-${colWidth}-`;
    			colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);

    			colClasses.push(classnames({
    				[colClass]: columnProp.size || columnProp.size === '',
    				[`order${colSizeInterfix}${columnProp.order}`]: columnProp.order || columnProp.order === 0,
    				[`offset${colSizeInterfix}${columnProp.offset}`]: columnProp.offset || columnProp.offset === 0
    			}));
    		} else {
    			colClass = getColumnSizeClass(isXs, colWidth, columnProp);
    			colClasses.push(colClass);
    		}
    	});

    	$$self.$$set = $$new_props => {
    		$$invalidate(18, $$props = assign$1(assign$1({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
    		if ('hidden' in $$new_props) $$invalidate(4, hidden = $$new_props.hidden);
    		if ('check' in $$new_props) $$invalidate(5, check = $$new_props.check);
    		if ('size' in $$new_props) $$invalidate(6, size = $$new_props.size);
    		if ('for' in $$new_props) $$invalidate(0, fore = $$new_props.for);
    		if ('xs' in $$new_props) $$invalidate(7, xs = $$new_props.xs);
    		if ('sm' in $$new_props) $$invalidate(8, sm = $$new_props.sm);
    		if ('md' in $$new_props) $$invalidate(9, md = $$new_props.md);
    		if ('lg' in $$new_props) $$invalidate(10, lg = $$new_props.lg);
    		if ('xl' in $$new_props) $$invalidate(11, xl = $$new_props.xl);
    		if ('xxl' in $$new_props) $$invalidate(12, xxl = $$new_props.xxl);
    		if ('widths' in $$new_props) $$invalidate(13, widths = $$new_props.widths);
    		if ('$$scope' in $$new_props) $$invalidate(14, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		getColumnSizeClass,
    		isObject,
    		className,
    		hidden,
    		check,
    		size,
    		fore,
    		xs,
    		sm,
    		md,
    		lg,
    		xl,
    		xxl,
    		colWidths,
    		widths,
    		colClasses,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(18, $$props = assign$1(assign$1({}, $$props), $$new_props));
    		if ('className' in $$props) $$invalidate(3, className = $$new_props.className);
    		if ('hidden' in $$props) $$invalidate(4, hidden = $$new_props.hidden);
    		if ('check' in $$props) $$invalidate(5, check = $$new_props.check);
    		if ('size' in $$props) $$invalidate(6, size = $$new_props.size);
    		if ('fore' in $$props) $$invalidate(0, fore = $$new_props.fore);
    		if ('xs' in $$props) $$invalidate(7, xs = $$new_props.xs);
    		if ('sm' in $$props) $$invalidate(8, sm = $$new_props.sm);
    		if ('md' in $$props) $$invalidate(9, md = $$new_props.md);
    		if ('lg' in $$props) $$invalidate(10, lg = $$new_props.lg);
    		if ('xl' in $$props) $$invalidate(11, xl = $$new_props.xl);
    		if ('xxl' in $$props) $$invalidate(12, xxl = $$new_props.xxl);
    		if ('widths' in $$props) $$invalidate(13, widths = $$new_props.widths);
    		if ('classes' in $$props) $$invalidate(1, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, hidden, check, size*/ 120) {
    			$$invalidate(1, classes = classnames(className, hidden ? 'visually-hidden' : false, check ? 'form-check-label' : false, size ? `col-form-label-${size}` : false, colClasses, colClasses.length ? 'col-form-label' : 'form-label'));
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		fore,
    		classes,
    		$$restProps,
    		className,
    		hidden,
    		check,
    		size,
    		xs,
    		sm,
    		md,
    		lg,
    		xl,
    		xxl,
    		widths,
    		$$scope,
    		slots
    	];
    }

    class Label extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			class: 3,
    			hidden: 4,
    			check: 5,
    			size: 6,
    			for: 0,
    			xs: 7,
    			sm: 8,
    			md: 9,
    			lg: 10,
    			xl: 11,
    			xxl: 12,
    			widths: 13
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Label",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get class() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hidden() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hidden(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get check() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set check(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get for() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set for(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get xs() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xs(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sm() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sm(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get md() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set md(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get lg() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set lg(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get xl() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xl(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get xxl() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xxl(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get widths() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set widths(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    var genericMessage = "Invariant Violation";
    var _a$3 = Object.setPrototypeOf, setPrototypeOf = _a$3 === void 0 ? function (obj, proto) {
        obj.__proto__ = proto;
        return obj;
    } : _a$3;
    var InvariantError = /** @class */ (function (_super) {
        __extends(InvariantError, _super);
        function InvariantError(message) {
            if (message === void 0) { message = genericMessage; }
            var _this = _super.call(this, typeof message === "number"
                ? genericMessage + ": " + message + " (see https://github.com/apollographql/invariant-packages)"
                : message) || this;
            _this.framesToPop = 1;
            _this.name = genericMessage;
            setPrototypeOf(_this, InvariantError.prototype);
            return _this;
        }
        return InvariantError;
    }(Error));
    function invariant$1(condition, message) {
        if (!condition) {
            throw new InvariantError(message);
        }
    }
    var verbosityLevels = ["debug", "log", "warn", "error", "silent"];
    var verbosityLevel = verbosityLevels.indexOf("log");
    function wrapConsoleMethod(name) {
        return function () {
            if (verbosityLevels.indexOf(name) >= verbosityLevel) {
                // Default to console.log if this host environment happens not to provide
                // all the console.* methods we need.
                var method = console[name] || console.log;
                return method.apply(console, arguments);
            }
        };
    }
    (function (invariant) {
        invariant.debug = wrapConsoleMethod("debug");
        invariant.log = wrapConsoleMethod("log");
        invariant.warn = wrapConsoleMethod("warn");
        invariant.error = wrapConsoleMethod("error");
    })(invariant$1 || (invariant$1 = {}));

    function maybe$1(thunk) {
        try {
            return thunk();
        }
        catch (_a) { }
    }

    var global$1 = (maybe$1(function () { return globalThis; }) ||
        maybe$1(function () { return window; }) ||
        maybe$1(function () { return self; }) ||
        maybe$1(function () { return global; }) || maybe$1(function () { return maybe$1.constructor("return this")(); }));

    var __ = "__";
    var GLOBAL_KEY = [__, __].join("DEV");
    function getDEV() {
        try {
            return Boolean(__DEV__);
        }
        catch (_a) {
            Object.defineProperty(global$1, GLOBAL_KEY, {
                value: maybe$1(function () { return "development"; }) !== "production",
                enumerable: false,
                configurable: true,
                writable: true,
            });
            return global$1[GLOBAL_KEY];
        }
    }
    var DEV = getDEV();

    function maybe(thunk) {
      try { return thunk() } catch (_) {}
    }

    var safeGlobal = (
      maybe(function() { return globalThis }) ||
      maybe(function() { return window }) ||
      maybe(function() { return self }) ||
      maybe(function() { return global }) ||
      // We don't expect the Function constructor ever to be invoked at runtime, as
      // long as at least one of globalThis, window, self, or global is defined, so
      // we are under no obligation to make it easy for static analysis tools to
      // detect syntactic usage of the Function constructor. If you think you can
      // improve your static analysis to detect this obfuscation, think again. This
      // is an arms race you cannot win, at least not in JavaScript.
      maybe(function() { return maybe.constructor("return this")() })
    );

    var needToRemove = false;

    function install() {
      if (safeGlobal &&
          !maybe(function() { return "development" }) &&
          !maybe(function() { return process })) {
        Object.defineProperty(safeGlobal, "process", {
          value: {
            env: {
              // This default needs to be "production" instead of "development", to
              // avoid the problem https://github.com/graphql/graphql-js/pull/2894
              // will eventually solve, once merged and released.
              NODE_ENV: "production",
            },
          },
          // Let anyone else change global.process as they see fit, but hide it from
          // Object.keys(global) enumeration.
          configurable: true,
          enumerable: false,
          writable: true,
        });
        needToRemove = true;
      }
    }

    // Call install() at least once, when this module is imported.
    install();

    function remove() {
      if (needToRemove) {
        delete safeGlobal.process;
        needToRemove = false;
      }
    }

    function devAssert(condition, message) {
      const booleanCondition = Boolean(condition);

      if (!booleanCondition) {
        throw new Error(message);
      }
    }

    /**
     * Return true if `value` is object-like. A value is object-like if it's not
     * `null` and has a `typeof` result of "object".
     */
    function isObjectLike(value) {
      return typeof value == 'object' && value !== null;
    }

    function invariant(condition, message) {
      const booleanCondition = Boolean(condition);

      if (!booleanCondition) {
        throw new Error(
          message != null ? message : 'Unexpected invariant triggered.',
        );
      }
    }

    const LineRegExp = /\r\n|[\n\r]/g;
    /**
     * Represents a location in a Source.
     */

    /**
     * Takes a Source and a UTF-8 character offset, and returns the corresponding
     * line and column as a SourceLocation.
     */
    function getLocation(source, position) {
      let lastLineStart = 0;
      let line = 1;

      for (const match of source.body.matchAll(LineRegExp)) {
        typeof match.index === 'number' || invariant(false);

        if (match.index >= position) {
          break;
        }

        lastLineStart = match.index + match[0].length;
        line += 1;
      }

      return {
        line,
        column: position + 1 - lastLineStart,
      };
    }

    /**
     * Render a helpful description of the location in the GraphQL Source document.
     */
    function printLocation(location) {
      return printSourceLocation(
        location.source,
        getLocation(location.source, location.start),
      );
    }
    /**
     * Render a helpful description of the location in the GraphQL Source document.
     */

    function printSourceLocation(source, sourceLocation) {
      const firstLineColumnOffset = source.locationOffset.column - 1;
      const body = ''.padStart(firstLineColumnOffset) + source.body;
      const lineIndex = sourceLocation.line - 1;
      const lineOffset = source.locationOffset.line - 1;
      const lineNum = sourceLocation.line + lineOffset;
      const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
      const columnNum = sourceLocation.column + columnOffset;
      const locationStr = `${source.name}:${lineNum}:${columnNum}\n`;
      const lines = body.split(/\r\n|[\n\r]/g);
      const locationLine = lines[lineIndex]; // Special case for minified documents

      if (locationLine.length > 120) {
        const subLineIndex = Math.floor(columnNum / 80);
        const subLineColumnNum = columnNum % 80;
        const subLines = [];

        for (let i = 0; i < locationLine.length; i += 80) {
          subLines.push(locationLine.slice(i, i + 80));
        }

        return (
          locationStr +
          printPrefixedLines([
            [`${lineNum} |`, subLines[0]],
            ...subLines.slice(1, subLineIndex + 1).map((subLine) => ['|', subLine]),
            ['|', '^'.padStart(subLineColumnNum)],
            ['|', subLines[subLineIndex + 1]],
          ])
        );
      }

      return (
        locationStr +
        printPrefixedLines([
          // Lines specified like this: ["prefix", "string"],
          [`${lineNum - 1} |`, lines[lineIndex - 1]],
          [`${lineNum} |`, locationLine],
          ['|', '^'.padStart(columnNum)],
          [`${lineNum + 1} |`, lines[lineIndex + 1]],
        ])
      );
    }

    function printPrefixedLines(lines) {
      const existingLines = lines.filter(([_, line]) => line !== undefined);
      const padLen = Math.max(...existingLines.map(([prefix]) => prefix.length));
      return existingLines
        .map(([prefix, line]) => prefix.padStart(padLen) + (line ? ' ' + line : ''))
        .join('\n');
    }

    function toNormalizedOptions(args) {
      const firstArg = args[0];

      if (firstArg == null || 'kind' in firstArg || 'length' in firstArg) {
        return {
          nodes: firstArg,
          source: args[1],
          positions: args[2],
          path: args[3],
          originalError: args[4],
          extensions: args[5],
        };
      }

      return firstArg;
    }
    /**
     * A GraphQLError describes an Error found during the parse, validate, or
     * execute phases of performing a GraphQL operation. In addition to a message
     * and stack trace, it also includes information about the locations in a
     * GraphQL document and/or execution result that correspond to the Error.
     */

    class GraphQLError extends Error {
      /**
       * An array of `{ line, column }` locations within the source GraphQL document
       * which correspond to this error.
       *
       * Errors during validation often contain multiple locations, for example to
       * point out two things with the same name. Errors during execution include a
       * single location, the field which produced the error.
       *
       * Enumerable, and appears in the result of JSON.stringify().
       */

      /**
       * An array describing the JSON-path into the execution response which
       * corresponds to this error. Only included for errors during execution.
       *
       * Enumerable, and appears in the result of JSON.stringify().
       */

      /**
       * An array of GraphQL AST Nodes corresponding to this error.
       */

      /**
       * The source GraphQL document for the first location of this error.
       *
       * Note that if this Error represents more than one node, the source may not
       * represent nodes after the first node.
       */

      /**
       * An array of character offsets within the source GraphQL document
       * which correspond to this error.
       */

      /**
       * The original error thrown from a field resolver during execution.
       */

      /**
       * Extension fields to add to the formatted error.
       */

      /**
       * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
       */
      constructor(message, ...rawArgs) {
        var _this$nodes, _nodeLocations$, _ref;

        const { nodes, source, positions, path, originalError, extensions } =
          toNormalizedOptions(rawArgs);
        super(message);
        this.name = 'GraphQLError';
        this.path = path !== null && path !== void 0 ? path : undefined;
        this.originalError =
          originalError !== null && originalError !== void 0
            ? originalError
            : undefined; // Compute list of blame nodes.

        this.nodes = undefinedIfEmpty(
          Array.isArray(nodes) ? nodes : nodes ? [nodes] : undefined,
        );
        const nodeLocations = undefinedIfEmpty(
          (_this$nodes = this.nodes) === null || _this$nodes === void 0
            ? void 0
            : _this$nodes.map((node) => node.loc).filter((loc) => loc != null),
        ); // Compute locations in the source for the given nodes/positions.

        this.source =
          source !== null && source !== void 0
            ? source
            : nodeLocations === null || nodeLocations === void 0
            ? void 0
            : (_nodeLocations$ = nodeLocations[0]) === null ||
              _nodeLocations$ === void 0
            ? void 0
            : _nodeLocations$.source;
        this.positions =
          positions !== null && positions !== void 0
            ? positions
            : nodeLocations === null || nodeLocations === void 0
            ? void 0
            : nodeLocations.map((loc) => loc.start);
        this.locations =
          positions && source
            ? positions.map((pos) => getLocation(source, pos))
            : nodeLocations === null || nodeLocations === void 0
            ? void 0
            : nodeLocations.map((loc) => getLocation(loc.source, loc.start));
        const originalExtensions = isObjectLike(
          originalError === null || originalError === void 0
            ? void 0
            : originalError.extensions,
        )
          ? originalError === null || originalError === void 0
            ? void 0
            : originalError.extensions
          : undefined;
        this.extensions =
          (_ref =
            extensions !== null && extensions !== void 0
              ? extensions
              : originalExtensions) !== null && _ref !== void 0
            ? _ref
            : Object.create(null); // Only properties prescribed by the spec should be enumerable.
        // Keep the rest as non-enumerable.

        Object.defineProperties(this, {
          message: {
            writable: true,
            enumerable: true,
          },
          name: {
            enumerable: false,
          },
          nodes: {
            enumerable: false,
          },
          source: {
            enumerable: false,
          },
          positions: {
            enumerable: false,
          },
          originalError: {
            enumerable: false,
          },
        }); // Include (non-enumerable) stack trace.

        /* c8 ignore start */
        // FIXME: https://github.com/graphql/graphql-js/issues/2317

        if (
          originalError !== null &&
          originalError !== void 0 &&
          originalError.stack
        ) {
          Object.defineProperty(this, 'stack', {
            value: originalError.stack,
            writable: true,
            configurable: true,
          });
        } else if (Error.captureStackTrace) {
          Error.captureStackTrace(this, GraphQLError);
        } else {
          Object.defineProperty(this, 'stack', {
            value: Error().stack,
            writable: true,
            configurable: true,
          });
        }
        /* c8 ignore stop */
      }

      get [Symbol.toStringTag]() {
        return 'GraphQLError';
      }

      toString() {
        let output = this.message;

        if (this.nodes) {
          for (const node of this.nodes) {
            if (node.loc) {
              output += '\n\n' + printLocation(node.loc);
            }
          }
        } else if (this.source && this.locations) {
          for (const location of this.locations) {
            output += '\n\n' + printSourceLocation(this.source, location);
          }
        }

        return output;
      }

      toJSON() {
        const formattedError = {
          message: this.message,
        };

        if (this.locations != null) {
          formattedError.locations = this.locations;
        }

        if (this.path != null) {
          formattedError.path = this.path;
        }

        if (this.extensions != null && Object.keys(this.extensions).length > 0) {
          formattedError.extensions = this.extensions;
        }

        return formattedError;
      }
    }

    function undefinedIfEmpty(array) {
      return array === undefined || array.length === 0 ? undefined : array;
    }

    /**
     * Produces a GraphQLError representing a syntax error, containing useful
     * descriptive information about the syntax error's position in the source.
     */

    function syntaxError(source, position, description) {
      return new GraphQLError(`Syntax Error: ${description}`, {
        source,
        positions: [position],
      });
    }

    /**
     * Contains a range of UTF-8 character offsets and token references that
     * identify the region of the source from which the AST derived.
     */
    class Location {
      /**
       * The character offset at which this Node begins.
       */

      /**
       * The character offset at which this Node ends.
       */

      /**
       * The Token at which this Node begins.
       */

      /**
       * The Token at which this Node ends.
       */

      /**
       * The Source document the AST represents.
       */
      constructor(startToken, endToken, source) {
        this.start = startToken.start;
        this.end = endToken.end;
        this.startToken = startToken;
        this.endToken = endToken;
        this.source = source;
      }

      get [Symbol.toStringTag]() {
        return 'Location';
      }

      toJSON() {
        return {
          start: this.start,
          end: this.end,
        };
      }
    }
    /**
     * Represents a range of characters represented by a lexical token
     * within a Source.
     */

    class Token {
      /**
       * The kind of Token.
       */

      /**
       * The character offset at which this Node begins.
       */

      /**
       * The character offset at which this Node ends.
       */

      /**
       * The 1-indexed line number on which this Token appears.
       */

      /**
       * The 1-indexed column number at which this Token begins.
       */

      /**
       * For non-punctuation tokens, represents the interpreted value of the token.
       *
       * Note: is undefined for punctuation tokens, but typed as string for
       * convenience in the parser.
       */

      /**
       * Tokens exist as nodes in a double-linked-list amongst all tokens
       * including ignored tokens. <SOF> is always the first node and <EOF>
       * the last.
       */
      constructor(kind, start, end, line, column, value) {
        this.kind = kind;
        this.start = start;
        this.end = end;
        this.line = line;
        this.column = column; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

        this.value = value;
        this.prev = null;
        this.next = null;
      }

      get [Symbol.toStringTag]() {
        return 'Token';
      }

      toJSON() {
        return {
          kind: this.kind,
          value: this.value,
          line: this.line,
          column: this.column,
        };
      }
    }
    /**
     * The list of all possible AST node types.
     */

    /**
     * @internal
     */
    const QueryDocumentKeys = {
      Name: [],
      Document: ['definitions'],
      OperationDefinition: [
        'name',
        'variableDefinitions',
        'directives',
        'selectionSet',
      ],
      VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
      Variable: ['name'],
      SelectionSet: ['selections'],
      Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
      Argument: ['name', 'value'],
      FragmentSpread: ['name', 'directives'],
      InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
      FragmentDefinition: [
        'name', // Note: fragment variable definitions are deprecated and will removed in v17.0.0
        'variableDefinitions',
        'typeCondition',
        'directives',
        'selectionSet',
      ],
      IntValue: [],
      FloatValue: [],
      StringValue: [],
      BooleanValue: [],
      NullValue: [],
      EnumValue: [],
      ListValue: ['values'],
      ObjectValue: ['fields'],
      ObjectField: ['name', 'value'],
      Directive: ['name', 'arguments'],
      NamedType: ['name'],
      ListType: ['type'],
      NonNullType: ['type'],
      SchemaDefinition: ['description', 'directives', 'operationTypes'],
      OperationTypeDefinition: ['type'],
      ScalarTypeDefinition: ['description', 'name', 'directives'],
      ObjectTypeDefinition: [
        'description',
        'name',
        'interfaces',
        'directives',
        'fields',
      ],
      FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
      InputValueDefinition: [
        'description',
        'name',
        'type',
        'defaultValue',
        'directives',
      ],
      InterfaceTypeDefinition: [
        'description',
        'name',
        'interfaces',
        'directives',
        'fields',
      ],
      UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
      EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
      EnumValueDefinition: ['description', 'name', 'directives'],
      InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
      DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
      SchemaExtension: ['directives', 'operationTypes'],
      ScalarTypeExtension: ['name', 'directives'],
      ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
      InterfaceTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
      UnionTypeExtension: ['name', 'directives', 'types'],
      EnumTypeExtension: ['name', 'directives', 'values'],
      InputObjectTypeExtension: ['name', 'directives', 'fields'],
    };
    const kindValues = new Set(Object.keys(QueryDocumentKeys));
    /**
     * @internal
     */

    function isNode(maybeNode) {
      const maybeKind =
        maybeNode === null || maybeNode === void 0 ? void 0 : maybeNode.kind;
      return typeof maybeKind === 'string' && kindValues.has(maybeKind);
    }
    /** Name */

    let OperationTypeNode;

    (function (OperationTypeNode) {
      OperationTypeNode['QUERY'] = 'query';
      OperationTypeNode['MUTATION'] = 'mutation';
      OperationTypeNode['SUBSCRIPTION'] = 'subscription';
    })(OperationTypeNode || (OperationTypeNode = {}));

    /**
     * The set of allowed directive location values.
     */
    let DirectiveLocation;
    /**
     * The enum type representing the directive location values.
     *
     * @deprecated Please use `DirectiveLocation`. Will be remove in v17.
     */

    (function (DirectiveLocation) {
      DirectiveLocation['QUERY'] = 'QUERY';
      DirectiveLocation['MUTATION'] = 'MUTATION';
      DirectiveLocation['SUBSCRIPTION'] = 'SUBSCRIPTION';
      DirectiveLocation['FIELD'] = 'FIELD';
      DirectiveLocation['FRAGMENT_DEFINITION'] = 'FRAGMENT_DEFINITION';
      DirectiveLocation['FRAGMENT_SPREAD'] = 'FRAGMENT_SPREAD';
      DirectiveLocation['INLINE_FRAGMENT'] = 'INLINE_FRAGMENT';
      DirectiveLocation['VARIABLE_DEFINITION'] = 'VARIABLE_DEFINITION';
      DirectiveLocation['SCHEMA'] = 'SCHEMA';
      DirectiveLocation['SCALAR'] = 'SCALAR';
      DirectiveLocation['OBJECT'] = 'OBJECT';
      DirectiveLocation['FIELD_DEFINITION'] = 'FIELD_DEFINITION';
      DirectiveLocation['ARGUMENT_DEFINITION'] = 'ARGUMENT_DEFINITION';
      DirectiveLocation['INTERFACE'] = 'INTERFACE';
      DirectiveLocation['UNION'] = 'UNION';
      DirectiveLocation['ENUM'] = 'ENUM';
      DirectiveLocation['ENUM_VALUE'] = 'ENUM_VALUE';
      DirectiveLocation['INPUT_OBJECT'] = 'INPUT_OBJECT';
      DirectiveLocation['INPUT_FIELD_DEFINITION'] = 'INPUT_FIELD_DEFINITION';
    })(DirectiveLocation || (DirectiveLocation = {}));

    /**
     * The set of allowed kind values for AST nodes.
     */
    let Kind;
    /**
     * The enum type representing the possible kind values of AST nodes.
     *
     * @deprecated Please use `Kind`. Will be remove in v17.
     */

    (function (Kind) {
      Kind['NAME'] = 'Name';
      Kind['DOCUMENT'] = 'Document';
      Kind['OPERATION_DEFINITION'] = 'OperationDefinition';
      Kind['VARIABLE_DEFINITION'] = 'VariableDefinition';
      Kind['SELECTION_SET'] = 'SelectionSet';
      Kind['FIELD'] = 'Field';
      Kind['ARGUMENT'] = 'Argument';
      Kind['FRAGMENT_SPREAD'] = 'FragmentSpread';
      Kind['INLINE_FRAGMENT'] = 'InlineFragment';
      Kind['FRAGMENT_DEFINITION'] = 'FragmentDefinition';
      Kind['VARIABLE'] = 'Variable';
      Kind['INT'] = 'IntValue';
      Kind['FLOAT'] = 'FloatValue';
      Kind['STRING'] = 'StringValue';
      Kind['BOOLEAN'] = 'BooleanValue';
      Kind['NULL'] = 'NullValue';
      Kind['ENUM'] = 'EnumValue';
      Kind['LIST'] = 'ListValue';
      Kind['OBJECT'] = 'ObjectValue';
      Kind['OBJECT_FIELD'] = 'ObjectField';
      Kind['DIRECTIVE'] = 'Directive';
      Kind['NAMED_TYPE'] = 'NamedType';
      Kind['LIST_TYPE'] = 'ListType';
      Kind['NON_NULL_TYPE'] = 'NonNullType';
      Kind['SCHEMA_DEFINITION'] = 'SchemaDefinition';
      Kind['OPERATION_TYPE_DEFINITION'] = 'OperationTypeDefinition';
      Kind['SCALAR_TYPE_DEFINITION'] = 'ScalarTypeDefinition';
      Kind['OBJECT_TYPE_DEFINITION'] = 'ObjectTypeDefinition';
      Kind['FIELD_DEFINITION'] = 'FieldDefinition';
      Kind['INPUT_VALUE_DEFINITION'] = 'InputValueDefinition';
      Kind['INTERFACE_TYPE_DEFINITION'] = 'InterfaceTypeDefinition';
      Kind['UNION_TYPE_DEFINITION'] = 'UnionTypeDefinition';
      Kind['ENUM_TYPE_DEFINITION'] = 'EnumTypeDefinition';
      Kind['ENUM_VALUE_DEFINITION'] = 'EnumValueDefinition';
      Kind['INPUT_OBJECT_TYPE_DEFINITION'] = 'InputObjectTypeDefinition';
      Kind['DIRECTIVE_DEFINITION'] = 'DirectiveDefinition';
      Kind['SCHEMA_EXTENSION'] = 'SchemaExtension';
      Kind['SCALAR_TYPE_EXTENSION'] = 'ScalarTypeExtension';
      Kind['OBJECT_TYPE_EXTENSION'] = 'ObjectTypeExtension';
      Kind['INTERFACE_TYPE_EXTENSION'] = 'InterfaceTypeExtension';
      Kind['UNION_TYPE_EXTENSION'] = 'UnionTypeExtension';
      Kind['ENUM_TYPE_EXTENSION'] = 'EnumTypeExtension';
      Kind['INPUT_OBJECT_TYPE_EXTENSION'] = 'InputObjectTypeExtension';
    })(Kind || (Kind = {}));

    /**
     * ```
     * WhiteSpace ::
     *   - "Horizontal Tab (U+0009)"
     *   - "Space (U+0020)"
     * ```
     * @internal
     */
    function isWhiteSpace(code) {
      return code === 0x0009 || code === 0x0020;
    }
    /**
     * ```
     * Digit :: one of
     *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
     * ```
     * @internal
     */

    function isDigit(code) {
      return code >= 0x0030 && code <= 0x0039;
    }
    /**
     * ```
     * Letter :: one of
     *   - `A` `B` `C` `D` `E` `F` `G` `H` `I` `J` `K` `L` `M`
     *   - `N` `O` `P` `Q` `R` `S` `T` `U` `V` `W` `X` `Y` `Z`
     *   - `a` `b` `c` `d` `e` `f` `g` `h` `i` `j` `k` `l` `m`
     *   - `n` `o` `p` `q` `r` `s` `t` `u` `v` `w` `x` `y` `z`
     * ```
     * @internal
     */

    function isLetter(code) {
      return (
        (code >= 0x0061 && code <= 0x007a) || // A-Z
        (code >= 0x0041 && code <= 0x005a) // a-z
      );
    }
    /**
     * ```
     * NameStart ::
     *   - Letter
     *   - `_`
     * ```
     * @internal
     */

    function isNameStart(code) {
      return isLetter(code) || code === 0x005f;
    }
    /**
     * ```
     * NameContinue ::
     *   - Letter
     *   - Digit
     *   - `_`
     * ```
     * @internal
     */

    function isNameContinue(code) {
      return isLetter(code) || isDigit(code) || code === 0x005f;
    }

    /**
     * Produces the value of a block string from its parsed raw value, similar to
     * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
     *
     * This implements the GraphQL spec's BlockStringValue() static algorithm.
     *
     * @internal
     */

    function dedentBlockStringLines(lines) {
      var _firstNonEmptyLine2;

      let commonIndent = Number.MAX_SAFE_INTEGER;
      let firstNonEmptyLine = null;
      let lastNonEmptyLine = -1;

      for (let i = 0; i < lines.length; ++i) {
        var _firstNonEmptyLine;

        const line = lines[i];
        const indent = leadingWhitespace(line);

        if (indent === line.length) {
          continue; // skip empty lines
        }

        firstNonEmptyLine =
          (_firstNonEmptyLine = firstNonEmptyLine) !== null &&
          _firstNonEmptyLine !== void 0
            ? _firstNonEmptyLine
            : i;
        lastNonEmptyLine = i;

        if (i !== 0 && indent < commonIndent) {
          commonIndent = indent;
        }
      }

      return lines // Remove common indentation from all lines but first.
        .map((line, i) => (i === 0 ? line : line.slice(commonIndent))) // Remove leading and trailing blank lines.
        .slice(
          (_firstNonEmptyLine2 = firstNonEmptyLine) !== null &&
            _firstNonEmptyLine2 !== void 0
            ? _firstNonEmptyLine2
            : 0,
          lastNonEmptyLine + 1,
        );
    }

    function leadingWhitespace(str) {
      let i = 0;

      while (i < str.length && isWhiteSpace(str.charCodeAt(i))) {
        ++i;
      }

      return i;
    }
    /**
     * Print a block string in the indented block form by adding a leading and
     * trailing blank line. However, if a block string starts with whitespace and is
     * a single-line, adding a leading blank line would strip that whitespace.
     *
     * @internal
     */

    function printBlockString(value, options) {
      const escapedValue = value.replace(/"""/g, '\\"""'); // Expand a block string's raw value into independent lines.

      const lines = escapedValue.split(/\r\n|[\n\r]/g);
      const isSingleLine = lines.length === 1; // If common indentation is found we can fix some of those cases by adding leading new line

      const forceLeadingNewLine =
        lines.length > 1 &&
        lines
          .slice(1)
          .every((line) => line.length === 0 || isWhiteSpace(line.charCodeAt(0))); // Trailing triple quotes just looks confusing but doesn't force trailing new line

      const hasTrailingTripleQuotes = escapedValue.endsWith('\\"""'); // Trailing quote (single or double) or slash forces trailing new line

      const hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
      const hasTrailingSlash = value.endsWith('\\');
      const forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
      const printAsMultipleLines =
        !(options !== null && options !== void 0 && options.minimize) && // add leading and trailing new lines only if it improves readability
        (!isSingleLine ||
          value.length > 70 ||
          forceTrailingNewline ||
          forceLeadingNewLine ||
          hasTrailingTripleQuotes);
      let result = ''; // Format a multi-line block quote to account for leading space.

      const skipLeadingNewLine = isSingleLine && isWhiteSpace(value.charCodeAt(0));

      if ((printAsMultipleLines && !skipLeadingNewLine) || forceLeadingNewLine) {
        result += '\n';
      }

      result += escapedValue;

      if (printAsMultipleLines || forceTrailingNewline) {
        result += '\n';
      }

      return '"""' + result + '"""';
    }

    /**
     * An exported enum describing the different kinds of tokens that the
     * lexer emits.
     */
    let TokenKind;
    /**
     * The enum type representing the token kinds values.
     *
     * @deprecated Please use `TokenKind`. Will be remove in v17.
     */

    (function (TokenKind) {
      TokenKind['SOF'] = '<SOF>';
      TokenKind['EOF'] = '<EOF>';
      TokenKind['BANG'] = '!';
      TokenKind['DOLLAR'] = '$';
      TokenKind['AMP'] = '&';
      TokenKind['PAREN_L'] = '(';
      TokenKind['PAREN_R'] = ')';
      TokenKind['SPREAD'] = '...';
      TokenKind['COLON'] = ':';
      TokenKind['EQUALS'] = '=';
      TokenKind['AT'] = '@';
      TokenKind['BRACKET_L'] = '[';
      TokenKind['BRACKET_R'] = ']';
      TokenKind['BRACE_L'] = '{';
      TokenKind['PIPE'] = '|';
      TokenKind['BRACE_R'] = '}';
      TokenKind['NAME'] = 'Name';
      TokenKind['INT'] = 'Int';
      TokenKind['FLOAT'] = 'Float';
      TokenKind['STRING'] = 'String';
      TokenKind['BLOCK_STRING'] = 'BlockString';
      TokenKind['COMMENT'] = 'Comment';
    })(TokenKind || (TokenKind = {}));

    /**
     * Given a Source object, creates a Lexer for that source.
     * A Lexer is a stateful stream generator in that every time
     * it is advanced, it returns the next token in the Source. Assuming the
     * source lexes, the final Token emitted by the lexer will be of kind
     * EOF, after which the lexer will repeatedly return the same EOF token
     * whenever called.
     */

    class Lexer {
      /**
       * The previously focused non-ignored token.
       */

      /**
       * The currently focused non-ignored token.
       */

      /**
       * The (1-indexed) line containing the current token.
       */

      /**
       * The character offset at which the current line begins.
       */
      constructor(source) {
        const startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0);
        this.source = source;
        this.lastToken = startOfFileToken;
        this.token = startOfFileToken;
        this.line = 1;
        this.lineStart = 0;
      }

      get [Symbol.toStringTag]() {
        return 'Lexer';
      }
      /**
       * Advances the token stream to the next non-ignored token.
       */

      advance() {
        this.lastToken = this.token;
        const token = (this.token = this.lookahead());
        return token;
      }
      /**
       * Looks ahead and returns the next non-ignored token, but does not change
       * the state of Lexer.
       */

      lookahead() {
        let token = this.token;

        if (token.kind !== TokenKind.EOF) {
          do {
            if (token.next) {
              token = token.next;
            } else {
              // Read the next token and form a link in the token linked-list.
              const nextToken = readNextToken(this, token.end); // @ts-expect-error next is only mutable during parsing.

              token.next = nextToken; // @ts-expect-error prev is only mutable during parsing.

              nextToken.prev = token;
              token = nextToken;
            }
          } while (token.kind === TokenKind.COMMENT);
        }

        return token;
      }
    }
    /**
     * @internal
     */

    function isPunctuatorTokenKind(kind) {
      return (
        kind === TokenKind.BANG ||
        kind === TokenKind.DOLLAR ||
        kind === TokenKind.AMP ||
        kind === TokenKind.PAREN_L ||
        kind === TokenKind.PAREN_R ||
        kind === TokenKind.SPREAD ||
        kind === TokenKind.COLON ||
        kind === TokenKind.EQUALS ||
        kind === TokenKind.AT ||
        kind === TokenKind.BRACKET_L ||
        kind === TokenKind.BRACKET_R ||
        kind === TokenKind.BRACE_L ||
        kind === TokenKind.PIPE ||
        kind === TokenKind.BRACE_R
      );
    }
    /**
     * A Unicode scalar value is any Unicode code point except surrogate code
     * points. In other words, the inclusive ranges of values 0x0000 to 0xD7FF and
     * 0xE000 to 0x10FFFF.
     *
     * SourceCharacter ::
     *   - "Any Unicode scalar value"
     */

    function isUnicodeScalarValue(code) {
      return (
        (code >= 0x0000 && code <= 0xd7ff) || (code >= 0xe000 && code <= 0x10ffff)
      );
    }
    /**
     * The GraphQL specification defines source text as a sequence of unicode scalar
     * values (which Unicode defines to exclude surrogate code points). However
     * JavaScript defines strings as a sequence of UTF-16 code units which may
     * include surrogates. A surrogate pair is a valid source character as it
     * encodes a supplementary code point (above U+FFFF), but unpaired surrogate
     * code points are not valid source characters.
     */

    function isSupplementaryCodePoint(body, location) {
      return (
        isLeadingSurrogate(body.charCodeAt(location)) &&
        isTrailingSurrogate(body.charCodeAt(location + 1))
      );
    }

    function isLeadingSurrogate(code) {
      return code >= 0xd800 && code <= 0xdbff;
    }

    function isTrailingSurrogate(code) {
      return code >= 0xdc00 && code <= 0xdfff;
    }
    /**
     * Prints the code point (or end of file reference) at a given location in a
     * source for use in error messages.
     *
     * Printable ASCII is printed quoted, while other points are printed in Unicode
     * code point form (ie. U+1234).
     */

    function printCodePointAt(lexer, location) {
      const code = lexer.source.body.codePointAt(location);

      if (code === undefined) {
        return TokenKind.EOF;
      } else if (code >= 0x0020 && code <= 0x007e) {
        // Printable ASCII
        const char = String.fromCodePoint(code);
        return char === '"' ? "'\"'" : `"${char}"`;
      } // Unicode code point

      return 'U+' + code.toString(16).toUpperCase().padStart(4, '0');
    }
    /**
     * Create a token with line and column location information.
     */

    function createToken(lexer, kind, start, end, value) {
      const line = lexer.line;
      const col = 1 + start - lexer.lineStart;
      return new Token(kind, start, end, line, col, value);
    }
    /**
     * Gets the next token from the source starting at the given position.
     *
     * This skips over whitespace until it finds the next lexable token, then lexes
     * punctuators immediately or calls the appropriate helper function for more
     * complicated tokens.
     */

    function readNextToken(lexer, start) {
      const body = lexer.source.body;
      const bodyLength = body.length;
      let position = start;

      while (position < bodyLength) {
        const code = body.charCodeAt(position); // SourceCharacter

        switch (code) {
          // Ignored ::
          //   - UnicodeBOM
          //   - WhiteSpace
          //   - LineTerminator
          //   - Comment
          //   - Comma
          //
          // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
          //
          // WhiteSpace ::
          //   - "Horizontal Tab (U+0009)"
          //   - "Space (U+0020)"
          //
          // Comma :: ,
          case 0xfeff: // <BOM>

          case 0x0009: // \t

          case 0x0020: // <space>

          case 0x002c:
            // ,
            ++position;
            continue;
          // LineTerminator ::
          //   - "New Line (U+000A)"
          //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
          //   - "Carriage Return (U+000D)" "New Line (U+000A)"

          case 0x000a:
            // \n
            ++position;
            ++lexer.line;
            lexer.lineStart = position;
            continue;

          case 0x000d:
            // \r
            if (body.charCodeAt(position + 1) === 0x000a) {
              position += 2;
            } else {
              ++position;
            }

            ++lexer.line;
            lexer.lineStart = position;
            continue;
          // Comment

          case 0x0023:
            // #
            return readComment(lexer, position);
          // Token ::
          //   - Punctuator
          //   - Name
          //   - IntValue
          //   - FloatValue
          //   - StringValue
          //
          // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }

          case 0x0021:
            // !
            return createToken(lexer, TokenKind.BANG, position, position + 1);

          case 0x0024:
            // $
            return createToken(lexer, TokenKind.DOLLAR, position, position + 1);

          case 0x0026:
            // &
            return createToken(lexer, TokenKind.AMP, position, position + 1);

          case 0x0028:
            // (
            return createToken(lexer, TokenKind.PAREN_L, position, position + 1);

          case 0x0029:
            // )
            return createToken(lexer, TokenKind.PAREN_R, position, position + 1);

          case 0x002e:
            // .
            if (
              body.charCodeAt(position + 1) === 0x002e &&
              body.charCodeAt(position + 2) === 0x002e
            ) {
              return createToken(lexer, TokenKind.SPREAD, position, position + 3);
            }

            break;

          case 0x003a:
            // :
            return createToken(lexer, TokenKind.COLON, position, position + 1);

          case 0x003d:
            // =
            return createToken(lexer, TokenKind.EQUALS, position, position + 1);

          case 0x0040:
            // @
            return createToken(lexer, TokenKind.AT, position, position + 1);

          case 0x005b:
            // [
            return createToken(lexer, TokenKind.BRACKET_L, position, position + 1);

          case 0x005d:
            // ]
            return createToken(lexer, TokenKind.BRACKET_R, position, position + 1);

          case 0x007b:
            // {
            return createToken(lexer, TokenKind.BRACE_L, position, position + 1);

          case 0x007c:
            // |
            return createToken(lexer, TokenKind.PIPE, position, position + 1);

          case 0x007d:
            // }
            return createToken(lexer, TokenKind.BRACE_R, position, position + 1);
          // StringValue

          case 0x0022:
            // "
            if (
              body.charCodeAt(position + 1) === 0x0022 &&
              body.charCodeAt(position + 2) === 0x0022
            ) {
              return readBlockString(lexer, position);
            }

            return readString(lexer, position);
        } // IntValue | FloatValue (Digit | -)

        if (isDigit(code) || code === 0x002d) {
          return readNumber(lexer, position, code);
        } // Name

        if (isNameStart(code)) {
          return readName(lexer, position);
        }

        throw syntaxError(
          lexer.source,
          position,
          code === 0x0027
            ? 'Unexpected single quote character (\'), did you mean to use a double quote (")?'
            : isUnicodeScalarValue(code) || isSupplementaryCodePoint(body, position)
            ? `Unexpected character: ${printCodePointAt(lexer, position)}.`
            : `Invalid character: ${printCodePointAt(lexer, position)}.`,
        );
      }

      return createToken(lexer, TokenKind.EOF, bodyLength, bodyLength);
    }
    /**
     * Reads a comment token from the source file.
     *
     * ```
     * Comment :: # CommentChar* [lookahead != CommentChar]
     *
     * CommentChar :: SourceCharacter but not LineTerminator
     * ```
     */

    function readComment(lexer, start) {
      const body = lexer.source.body;
      const bodyLength = body.length;
      let position = start + 1;

      while (position < bodyLength) {
        const code = body.charCodeAt(position); // LineTerminator (\n | \r)

        if (code === 0x000a || code === 0x000d) {
          break;
        } // SourceCharacter

        if (isUnicodeScalarValue(code)) {
          ++position;
        } else if (isSupplementaryCodePoint(body, position)) {
          position += 2;
        } else {
          break;
        }
      }

      return createToken(
        lexer,
        TokenKind.COMMENT,
        start,
        position,
        body.slice(start + 1, position),
      );
    }
    /**
     * Reads a number token from the source file, either a FloatValue or an IntValue
     * depending on whether a FractionalPart or ExponentPart is encountered.
     *
     * ```
     * IntValue :: IntegerPart [lookahead != {Digit, `.`, NameStart}]
     *
     * IntegerPart ::
     *   - NegativeSign? 0
     *   - NegativeSign? NonZeroDigit Digit*
     *
     * NegativeSign :: -
     *
     * NonZeroDigit :: Digit but not `0`
     *
     * FloatValue ::
     *   - IntegerPart FractionalPart ExponentPart [lookahead != {Digit, `.`, NameStart}]
     *   - IntegerPart FractionalPart [lookahead != {Digit, `.`, NameStart}]
     *   - IntegerPart ExponentPart [lookahead != {Digit, `.`, NameStart}]
     *
     * FractionalPart :: . Digit+
     *
     * ExponentPart :: ExponentIndicator Sign? Digit+
     *
     * ExponentIndicator :: one of `e` `E`
     *
     * Sign :: one of + -
     * ```
     */

    function readNumber(lexer, start, firstCode) {
      const body = lexer.source.body;
      let position = start;
      let code = firstCode;
      let isFloat = false; // NegativeSign (-)

      if (code === 0x002d) {
        code = body.charCodeAt(++position);
      } // Zero (0)

      if (code === 0x0030) {
        code = body.charCodeAt(++position);

        if (isDigit(code)) {
          throw syntaxError(
            lexer.source,
            position,
            `Invalid number, unexpected digit after 0: ${printCodePointAt(
          lexer,
          position,
        )}.`,
          );
        }
      } else {
        position = readDigits(lexer, position, code);
        code = body.charCodeAt(position);
      } // Full stop (.)

      if (code === 0x002e) {
        isFloat = true;
        code = body.charCodeAt(++position);
        position = readDigits(lexer, position, code);
        code = body.charCodeAt(position);
      } // E e

      if (code === 0x0045 || code === 0x0065) {
        isFloat = true;
        code = body.charCodeAt(++position); // + -

        if (code === 0x002b || code === 0x002d) {
          code = body.charCodeAt(++position);
        }

        position = readDigits(lexer, position, code);
        code = body.charCodeAt(position);
      } // Numbers cannot be followed by . or NameStart

      if (code === 0x002e || isNameStart(code)) {
        throw syntaxError(
          lexer.source,
          position,
          `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        position,
      )}.`,
        );
      }

      return createToken(
        lexer,
        isFloat ? TokenKind.FLOAT : TokenKind.INT,
        start,
        position,
        body.slice(start, position),
      );
    }
    /**
     * Returns the new position in the source after reading one or more digits.
     */

    function readDigits(lexer, start, firstCode) {
      if (!isDigit(firstCode)) {
        throw syntaxError(
          lexer.source,
          start,
          `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        start,
      )}.`,
        );
      }

      const body = lexer.source.body;
      let position = start + 1; // +1 to skip first firstCode

      while (isDigit(body.charCodeAt(position))) {
        ++position;
      }

      return position;
    }
    /**
     * Reads a single-quote string token from the source file.
     *
     * ```
     * StringValue ::
     *   - `""` [lookahead != `"`]
     *   - `"` StringCharacter+ `"`
     *
     * StringCharacter ::
     *   - SourceCharacter but not `"` or `\` or LineTerminator
     *   - `\u` EscapedUnicode
     *   - `\` EscapedCharacter
     *
     * EscapedUnicode ::
     *   - `{` HexDigit+ `}`
     *   - HexDigit HexDigit HexDigit HexDigit
     *
     * EscapedCharacter :: one of `"` `\` `/` `b` `f` `n` `r` `t`
     * ```
     */

    function readString(lexer, start) {
      const body = lexer.source.body;
      const bodyLength = body.length;
      let position = start + 1;
      let chunkStart = position;
      let value = '';

      while (position < bodyLength) {
        const code = body.charCodeAt(position); // Closing Quote (")

        if (code === 0x0022) {
          value += body.slice(chunkStart, position);
          return createToken(lexer, TokenKind.STRING, start, position + 1, value);
        } // Escape Sequence (\)

        if (code === 0x005c) {
          value += body.slice(chunkStart, position);
          const escape =
            body.charCodeAt(position + 1) === 0x0075 // u
              ? body.charCodeAt(position + 2) === 0x007b // {
                ? readEscapedUnicodeVariableWidth(lexer, position)
                : readEscapedUnicodeFixedWidth(lexer, position)
              : readEscapedCharacter(lexer, position);
          value += escape.value;
          position += escape.size;
          chunkStart = position;
          continue;
        } // LineTerminator (\n | \r)

        if (code === 0x000a || code === 0x000d) {
          break;
        } // SourceCharacter

        if (isUnicodeScalarValue(code)) {
          ++position;
        } else if (isSupplementaryCodePoint(body, position)) {
          position += 2;
        } else {
          throw syntaxError(
            lexer.source,
            position,
            `Invalid character within String: ${printCodePointAt(
          lexer,
          position,
        )}.`,
          );
        }
      }

      throw syntaxError(lexer.source, position, 'Unterminated string.');
    } // The string value and lexed size of an escape sequence.

    function readEscapedUnicodeVariableWidth(lexer, position) {
      const body = lexer.source.body;
      let point = 0;
      let size = 3; // Cannot be larger than 12 chars (\u{00000000}).

      while (size < 12) {
        const code = body.charCodeAt(position + size++); // Closing Brace (})

        if (code === 0x007d) {
          // Must be at least 5 chars (\u{0}) and encode a Unicode scalar value.
          if (size < 5 || !isUnicodeScalarValue(point)) {
            break;
          }

          return {
            value: String.fromCodePoint(point),
            size,
          };
        } // Append this hex digit to the code point.

        point = (point << 4) | readHexDigit(code);

        if (point < 0) {
          break;
        }
      }

      throw syntaxError(
        lexer.source,
        position,
        `Invalid Unicode escape sequence: "${body.slice(
      position,
      position + size,
    )}".`,
      );
    }

    function readEscapedUnicodeFixedWidth(lexer, position) {
      const body = lexer.source.body;
      const code = read16BitHexCode(body, position + 2);

      if (isUnicodeScalarValue(code)) {
        return {
          value: String.fromCodePoint(code),
          size: 6,
        };
      } // GraphQL allows JSON-style surrogate pair escape sequences, but only when
      // a valid pair is formed.

      if (isLeadingSurrogate(code)) {
        // \u
        if (
          body.charCodeAt(position + 6) === 0x005c &&
          body.charCodeAt(position + 7) === 0x0075
        ) {
          const trailingCode = read16BitHexCode(body, position + 8);

          if (isTrailingSurrogate(trailingCode)) {
            // JavaScript defines strings as a sequence of UTF-16 code units and
            // encodes Unicode code points above U+FFFF using a surrogate pair of
            // code units. Since this is a surrogate pair escape sequence, just
            // include both codes into the JavaScript string value. Had JavaScript
            // not been internally based on UTF-16, then this surrogate pair would
            // be decoded to retrieve the supplementary code point.
            return {
              value: String.fromCodePoint(code, trailingCode),
              size: 12,
            };
          }
        }
      }

      throw syntaxError(
        lexer.source,
        position,
        `Invalid Unicode escape sequence: "${body.slice(position, position + 6)}".`,
      );
    }
    /**
     * Reads four hexadecimal characters and returns the positive integer that 16bit
     * hexadecimal string represents. For example, "000f" will return 15, and "dead"
     * will return 57005.
     *
     * Returns a negative number if any char was not a valid hexadecimal digit.
     */

    function read16BitHexCode(body, position) {
      // readHexDigit() returns -1 on error. ORing a negative value with any other
      // value always produces a negative value.
      return (
        (readHexDigit(body.charCodeAt(position)) << 12) |
        (readHexDigit(body.charCodeAt(position + 1)) << 8) |
        (readHexDigit(body.charCodeAt(position + 2)) << 4) |
        readHexDigit(body.charCodeAt(position + 3))
      );
    }
    /**
     * Reads a hexadecimal character and returns its positive integer value (0-15).
     *
     * '0' becomes 0, '9' becomes 9
     * 'A' becomes 10, 'F' becomes 15
     * 'a' becomes 10, 'f' becomes 15
     *
     * Returns -1 if the provided character code was not a valid hexadecimal digit.
     *
     * HexDigit :: one of
     *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
     *   - `A` `B` `C` `D` `E` `F`
     *   - `a` `b` `c` `d` `e` `f`
     */

    function readHexDigit(code) {
      return code >= 0x0030 && code <= 0x0039 // 0-9
        ? code - 0x0030
        : code >= 0x0041 && code <= 0x0046 // A-F
        ? code - 0x0037
        : code >= 0x0061 && code <= 0x0066 // a-f
        ? code - 0x0057
        : -1;
    }
    /**
     * | Escaped Character | Code Point | Character Name               |
     * | ----------------- | ---------- | ---------------------------- |
     * | `"`               | U+0022     | double quote                 |
     * | `\`               | U+005C     | reverse solidus (back slash) |
     * | `/`               | U+002F     | solidus (forward slash)      |
     * | `b`               | U+0008     | backspace                    |
     * | `f`               | U+000C     | form feed                    |
     * | `n`               | U+000A     | line feed (new line)         |
     * | `r`               | U+000D     | carriage return              |
     * | `t`               | U+0009     | horizontal tab               |
     */

    function readEscapedCharacter(lexer, position) {
      const body = lexer.source.body;
      const code = body.charCodeAt(position + 1);

      switch (code) {
        case 0x0022:
          // "
          return {
            value: '\u0022',
            size: 2,
          };

        case 0x005c:
          // \
          return {
            value: '\u005c',
            size: 2,
          };

        case 0x002f:
          // /
          return {
            value: '\u002f',
            size: 2,
          };

        case 0x0062:
          // b
          return {
            value: '\u0008',
            size: 2,
          };

        case 0x0066:
          // f
          return {
            value: '\u000c',
            size: 2,
          };

        case 0x006e:
          // n
          return {
            value: '\u000a',
            size: 2,
          };

        case 0x0072:
          // r
          return {
            value: '\u000d',
            size: 2,
          };

        case 0x0074:
          // t
          return {
            value: '\u0009',
            size: 2,
          };
      }

      throw syntaxError(
        lexer.source,
        position,
        `Invalid character escape sequence: "${body.slice(
      position,
      position + 2,
    )}".`,
      );
    }
    /**
     * Reads a block string token from the source file.
     *
     * ```
     * StringValue ::
     *   - `"""` BlockStringCharacter* `"""`
     *
     * BlockStringCharacter ::
     *   - SourceCharacter but not `"""` or `\"""`
     *   - `\"""`
     * ```
     */

    function readBlockString(lexer, start) {
      const body = lexer.source.body;
      const bodyLength = body.length;
      let lineStart = lexer.lineStart;
      let position = start + 3;
      let chunkStart = position;
      let currentLine = '';
      const blockLines = [];

      while (position < bodyLength) {
        const code = body.charCodeAt(position); // Closing Triple-Quote (""")

        if (
          code === 0x0022 &&
          body.charCodeAt(position + 1) === 0x0022 &&
          body.charCodeAt(position + 2) === 0x0022
        ) {
          currentLine += body.slice(chunkStart, position);
          blockLines.push(currentLine);
          const token = createToken(
            lexer,
            TokenKind.BLOCK_STRING,
            start,
            position + 3, // Return a string of the lines joined with U+000A.
            dedentBlockStringLines(blockLines).join('\n'),
          );
          lexer.line += blockLines.length - 1;
          lexer.lineStart = lineStart;
          return token;
        } // Escaped Triple-Quote (\""")

        if (
          code === 0x005c &&
          body.charCodeAt(position + 1) === 0x0022 &&
          body.charCodeAt(position + 2) === 0x0022 &&
          body.charCodeAt(position + 3) === 0x0022
        ) {
          currentLine += body.slice(chunkStart, position);
          chunkStart = position + 1; // skip only slash

          position += 4;
          continue;
        } // LineTerminator

        if (code === 0x000a || code === 0x000d) {
          currentLine += body.slice(chunkStart, position);
          blockLines.push(currentLine);

          if (code === 0x000d && body.charCodeAt(position + 1) === 0x000a) {
            position += 2;
          } else {
            ++position;
          }

          currentLine = '';
          chunkStart = position;
          lineStart = position;
          continue;
        } // SourceCharacter

        if (isUnicodeScalarValue(code)) {
          ++position;
        } else if (isSupplementaryCodePoint(body, position)) {
          position += 2;
        } else {
          throw syntaxError(
            lexer.source,
            position,
            `Invalid character within String: ${printCodePointAt(
          lexer,
          position,
        )}.`,
          );
        }
      }

      throw syntaxError(lexer.source, position, 'Unterminated string.');
    }
    /**
     * Reads an alphanumeric + underscore name from the source.
     *
     * ```
     * Name ::
     *   - NameStart NameContinue* [lookahead != NameContinue]
     * ```
     */

    function readName(lexer, start) {
      const body = lexer.source.body;
      const bodyLength = body.length;
      let position = start + 1;

      while (position < bodyLength) {
        const code = body.charCodeAt(position);

        if (isNameContinue(code)) {
          ++position;
        } else {
          break;
        }
      }

      return createToken(
        lexer,
        TokenKind.NAME,
        start,
        position,
        body.slice(start, position),
      );
    }

    const MAX_ARRAY_LENGTH = 10;
    const MAX_RECURSIVE_DEPTH = 2;
    /**
     * Used to print values in error messages.
     */

    function inspect(value) {
      return formatValue(value, []);
    }

    function formatValue(value, seenValues) {
      switch (typeof value) {
        case 'string':
          return JSON.stringify(value);

        case 'function':
          return value.name ? `[function ${value.name}]` : '[function]';

        case 'object':
          return formatObjectValue(value, seenValues);

        default:
          return String(value);
      }
    }

    function formatObjectValue(value, previouslySeenValues) {
      if (value === null) {
        return 'null';
      }

      if (previouslySeenValues.includes(value)) {
        return '[Circular]';
      }

      const seenValues = [...previouslySeenValues, value];

      if (isJSONable(value)) {
        const jsonValue = value.toJSON(); // check for infinite recursion

        if (jsonValue !== value) {
          return typeof jsonValue === 'string'
            ? jsonValue
            : formatValue(jsonValue, seenValues);
        }
      } else if (Array.isArray(value)) {
        return formatArray(value, seenValues);
      }

      return formatObject(value, seenValues);
    }

    function isJSONable(value) {
      return typeof value.toJSON === 'function';
    }

    function formatObject(object, seenValues) {
      const entries = Object.entries(object);

      if (entries.length === 0) {
        return '{}';
      }

      if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return '[' + getObjectTag(object) + ']';
      }

      const properties = entries.map(
        ([key, value]) => key + ': ' + formatValue(value, seenValues),
      );
      return '{ ' + properties.join(', ') + ' }';
    }

    function formatArray(array, seenValues) {
      if (array.length === 0) {
        return '[]';
      }

      if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return '[Array]';
      }

      const len = Math.min(MAX_ARRAY_LENGTH, array.length);
      const remaining = array.length - len;
      const items = [];

      for (let i = 0; i < len; ++i) {
        items.push(formatValue(array[i], seenValues));
      }

      if (remaining === 1) {
        items.push('... 1 more item');
      } else if (remaining > 1) {
        items.push(`... ${remaining} more items`);
      }

      return '[' + items.join(', ') + ']';
    }

    function getObjectTag(object) {
      const tag = Object.prototype.toString
        .call(object)
        .replace(/^\[object /, '')
        .replace(/]$/, '');

      if (tag === 'Object' && typeof object.constructor === 'function') {
        const name = object.constructor.name;

        if (typeof name === 'string' && name !== '') {
          return name;
        }
      }

      return tag;
    }

    /**
     * A replacement for instanceof which includes an error warning when multi-realm
     * constructors are detected.
     * See: https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
     * See: https://webpack.js.org/guides/production/
     */

    const instanceOf =
      /* c8 ignore next 6 */
      // FIXME: https://github.com/graphql/graphql-js/issues/2317
      // eslint-disable-next-line no-undef
      function instanceOf(value, constructor) {
            if (value instanceof constructor) {
              return true;
            }

            if (typeof value === 'object' && value !== null) {
              var _value$constructor;

              // Prefer Symbol.toStringTag since it is immune to minification.
              const className = constructor.prototype[Symbol.toStringTag];
              const valueClassName = // We still need to support constructor's name to detect conflicts with older versions of this library.
                Symbol.toStringTag in value // @ts-expect-error TS bug see, https://github.com/microsoft/TypeScript/issues/38009
                  ? value[Symbol.toStringTag]
                  : (_value$constructor = value.constructor) === null ||
                    _value$constructor === void 0
                  ? void 0
                  : _value$constructor.name;

              if (className === valueClassName) {
                const stringifiedValue = inspect(value);
                throw new Error(`Cannot use ${className} "${stringifiedValue}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
              }
            }

            return false;
          };

    /**
     * A representation of source input to GraphQL. The `name` and `locationOffset` parameters are
     * optional, but they are useful for clients who store GraphQL documents in source files.
     * For example, if the GraphQL input starts at line 40 in a file named `Foo.graphql`, it might
     * be useful for `name` to be `"Foo.graphql"` and location to be `{ line: 40, column: 1 }`.
     * The `line` and `column` properties in `locationOffset` are 1-indexed.
     */
    class Source {
      constructor(
        body,
        name = 'GraphQL request',
        locationOffset = {
          line: 1,
          column: 1,
        },
      ) {
        typeof body === 'string' ||
          devAssert(false, `Body must be a string. Received: ${inspect(body)}.`);
        this.body = body;
        this.name = name;
        this.locationOffset = locationOffset;
        this.locationOffset.line > 0 ||
          devAssert(
            false,
            'line in locationOffset is 1-indexed and must be positive.',
          );
        this.locationOffset.column > 0 ||
          devAssert(
            false,
            'column in locationOffset is 1-indexed and must be positive.',
          );
      }

      get [Symbol.toStringTag]() {
        return 'Source';
      }
    }
    /**
     * Test if the given value is a Source object.
     *
     * @internal
     */

    function isSource(source) {
      return instanceOf(source, Source);
    }

    /**
     * Configuration options to control parser behavior
     */

    /**
     * Given a GraphQL source, parses it into a Document.
     * Throws GraphQLError if a syntax error is encountered.
     */
    function parse(source, options) {
      const parser = new Parser(source, options);
      return parser.parseDocument();
    }
    /**
     * This class is exported only to assist people in implementing their own parsers
     * without duplicating too much code and should be used only as last resort for cases
     * such as experimental syntax or if certain features could not be contributed upstream.
     *
     * It is still part of the internal API and is versioned, so any changes to it are never
     * considered breaking changes. If you still need to support multiple versions of the
     * library, please use the `versionInfo` variable for version detection.
     *
     * @internal
     */

    class Parser {
      constructor(source, options) {
        const sourceObj = isSource(source) ? source : new Source(source);
        this._lexer = new Lexer(sourceObj);
        this._options = options;
      }
      /**
       * Converts a name lex token into a name parse node.
       */

      parseName() {
        const token = this.expectToken(TokenKind.NAME);
        return this.node(token, {
          kind: Kind.NAME,
          value: token.value,
        });
      } // Implements the parsing rules in the Document section.

      /**
       * Document : Definition+
       */

      parseDocument() {
        return this.node(this._lexer.token, {
          kind: Kind.DOCUMENT,
          definitions: this.many(
            TokenKind.SOF,
            this.parseDefinition,
            TokenKind.EOF,
          ),
        });
      }
      /**
       * Definition :
       *   - ExecutableDefinition
       *   - TypeSystemDefinition
       *   - TypeSystemExtension
       *
       * ExecutableDefinition :
       *   - OperationDefinition
       *   - FragmentDefinition
       *
       * TypeSystemDefinition :
       *   - SchemaDefinition
       *   - TypeDefinition
       *   - DirectiveDefinition
       *
       * TypeDefinition :
       *   - ScalarTypeDefinition
       *   - ObjectTypeDefinition
       *   - InterfaceTypeDefinition
       *   - UnionTypeDefinition
       *   - EnumTypeDefinition
       *   - InputObjectTypeDefinition
       */

      parseDefinition() {
        if (this.peek(TokenKind.BRACE_L)) {
          return this.parseOperationDefinition();
        } // Many definitions begin with a description and require a lookahead.

        const hasDescription = this.peekDescription();
        const keywordToken = hasDescription
          ? this._lexer.lookahead()
          : this._lexer.token;

        if (keywordToken.kind === TokenKind.NAME) {
          switch (keywordToken.value) {
            case 'schema':
              return this.parseSchemaDefinition();

            case 'scalar':
              return this.parseScalarTypeDefinition();

            case 'type':
              return this.parseObjectTypeDefinition();

            case 'interface':
              return this.parseInterfaceTypeDefinition();

            case 'union':
              return this.parseUnionTypeDefinition();

            case 'enum':
              return this.parseEnumTypeDefinition();

            case 'input':
              return this.parseInputObjectTypeDefinition();

            case 'directive':
              return this.parseDirectiveDefinition();
          }

          if (hasDescription) {
            throw syntaxError(
              this._lexer.source,
              this._lexer.token.start,
              'Unexpected description, descriptions are supported only on type definitions.',
            );
          }

          switch (keywordToken.value) {
            case 'query':
            case 'mutation':
            case 'subscription':
              return this.parseOperationDefinition();

            case 'fragment':
              return this.parseFragmentDefinition();

            case 'extend':
              return this.parseTypeSystemExtension();
          }
        }

        throw this.unexpected(keywordToken);
      } // Implements the parsing rules in the Operations section.

      /**
       * OperationDefinition :
       *  - SelectionSet
       *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
       */

      parseOperationDefinition() {
        const start = this._lexer.token;

        if (this.peek(TokenKind.BRACE_L)) {
          return this.node(start, {
            kind: Kind.OPERATION_DEFINITION,
            operation: OperationTypeNode.QUERY,
            name: undefined,
            variableDefinitions: [],
            directives: [],
            selectionSet: this.parseSelectionSet(),
          });
        }

        const operation = this.parseOperationType();
        let name;

        if (this.peek(TokenKind.NAME)) {
          name = this.parseName();
        }

        return this.node(start, {
          kind: Kind.OPERATION_DEFINITION,
          operation,
          name,
          variableDefinitions: this.parseVariableDefinitions(),
          directives: this.parseDirectives(false),
          selectionSet: this.parseSelectionSet(),
        });
      }
      /**
       * OperationType : one of query mutation subscription
       */

      parseOperationType() {
        const operationToken = this.expectToken(TokenKind.NAME);

        switch (operationToken.value) {
          case 'query':
            return OperationTypeNode.QUERY;

          case 'mutation':
            return OperationTypeNode.MUTATION;

          case 'subscription':
            return OperationTypeNode.SUBSCRIPTION;
        }

        throw this.unexpected(operationToken);
      }
      /**
       * VariableDefinitions : ( VariableDefinition+ )
       */

      parseVariableDefinitions() {
        return this.optionalMany(
          TokenKind.PAREN_L,
          this.parseVariableDefinition,
          TokenKind.PAREN_R,
        );
      }
      /**
       * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
       */

      parseVariableDefinition() {
        return this.node(this._lexer.token, {
          kind: Kind.VARIABLE_DEFINITION,
          variable: this.parseVariable(),
          type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
          defaultValue: this.expectOptionalToken(TokenKind.EQUALS)
            ? this.parseConstValueLiteral()
            : undefined,
          directives: this.parseConstDirectives(),
        });
      }
      /**
       * Variable : $ Name
       */

      parseVariable() {
        const start = this._lexer.token;
        this.expectToken(TokenKind.DOLLAR);
        return this.node(start, {
          kind: Kind.VARIABLE,
          name: this.parseName(),
        });
      }
      /**
       * ```
       * SelectionSet : { Selection+ }
       * ```
       */

      parseSelectionSet() {
        return this.node(this._lexer.token, {
          kind: Kind.SELECTION_SET,
          selections: this.many(
            TokenKind.BRACE_L,
            this.parseSelection,
            TokenKind.BRACE_R,
          ),
        });
      }
      /**
       * Selection :
       *   - Field
       *   - FragmentSpread
       *   - InlineFragment
       */

      parseSelection() {
        return this.peek(TokenKind.SPREAD)
          ? this.parseFragment()
          : this.parseField();
      }
      /**
       * Field : Alias? Name Arguments? Directives? SelectionSet?
       *
       * Alias : Name :
       */

      parseField() {
        const start = this._lexer.token;
        const nameOrAlias = this.parseName();
        let alias;
        let name;

        if (this.expectOptionalToken(TokenKind.COLON)) {
          alias = nameOrAlias;
          name = this.parseName();
        } else {
          name = nameOrAlias;
        }

        return this.node(start, {
          kind: Kind.FIELD,
          alias,
          name,
          arguments: this.parseArguments(false),
          directives: this.parseDirectives(false),
          selectionSet: this.peek(TokenKind.BRACE_L)
            ? this.parseSelectionSet()
            : undefined,
        });
      }
      /**
       * Arguments[Const] : ( Argument[?Const]+ )
       */

      parseArguments(isConst) {
        const item = isConst ? this.parseConstArgument : this.parseArgument;
        return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
      }
      /**
       * Argument[Const] : Name : Value[?Const]
       */

      parseArgument(isConst = false) {
        const start = this._lexer.token;
        const name = this.parseName();
        this.expectToken(TokenKind.COLON);
        return this.node(start, {
          kind: Kind.ARGUMENT,
          name,
          value: this.parseValueLiteral(isConst),
        });
      }

      parseConstArgument() {
        return this.parseArgument(true);
      } // Implements the parsing rules in the Fragments section.

      /**
       * Corresponds to both FragmentSpread and InlineFragment in the spec.
       *
       * FragmentSpread : ... FragmentName Directives?
       *
       * InlineFragment : ... TypeCondition? Directives? SelectionSet
       */

      parseFragment() {
        const start = this._lexer.token;
        this.expectToken(TokenKind.SPREAD);
        const hasTypeCondition = this.expectOptionalKeyword('on');

        if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
          return this.node(start, {
            kind: Kind.FRAGMENT_SPREAD,
            name: this.parseFragmentName(),
            directives: this.parseDirectives(false),
          });
        }

        return this.node(start, {
          kind: Kind.INLINE_FRAGMENT,
          typeCondition: hasTypeCondition ? this.parseNamedType() : undefined,
          directives: this.parseDirectives(false),
          selectionSet: this.parseSelectionSet(),
        });
      }
      /**
       * FragmentDefinition :
       *   - fragment FragmentName on TypeCondition Directives? SelectionSet
       *
       * TypeCondition : NamedType
       */

      parseFragmentDefinition() {
        var _this$_options;

        const start = this._lexer.token;
        this.expectKeyword('fragment'); // Legacy support for defining variables within fragments changes
        // the grammar of FragmentDefinition:
        //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet

        if (
          ((_this$_options = this._options) === null || _this$_options === void 0
            ? void 0
            : _this$_options.allowLegacyFragmentVariables) === true
        ) {
          return this.node(start, {
            kind: Kind.FRAGMENT_DEFINITION,
            name: this.parseFragmentName(),
            variableDefinitions: this.parseVariableDefinitions(),
            typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
            directives: this.parseDirectives(false),
            selectionSet: this.parseSelectionSet(),
          });
        }

        return this.node(start, {
          kind: Kind.FRAGMENT_DEFINITION,
          name: this.parseFragmentName(),
          typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
          directives: this.parseDirectives(false),
          selectionSet: this.parseSelectionSet(),
        });
      }
      /**
       * FragmentName : Name but not `on`
       */

      parseFragmentName() {
        if (this._lexer.token.value === 'on') {
          throw this.unexpected();
        }

        return this.parseName();
      } // Implements the parsing rules in the Values section.

      /**
       * Value[Const] :
       *   - [~Const] Variable
       *   - IntValue
       *   - FloatValue
       *   - StringValue
       *   - BooleanValue
       *   - NullValue
       *   - EnumValue
       *   - ListValue[?Const]
       *   - ObjectValue[?Const]
       *
       * BooleanValue : one of `true` `false`
       *
       * NullValue : `null`
       *
       * EnumValue : Name but not `true`, `false` or `null`
       */

      parseValueLiteral(isConst) {
        const token = this._lexer.token;

        switch (token.kind) {
          case TokenKind.BRACKET_L:
            return this.parseList(isConst);

          case TokenKind.BRACE_L:
            return this.parseObject(isConst);

          case TokenKind.INT:
            this._lexer.advance();

            return this.node(token, {
              kind: Kind.INT,
              value: token.value,
            });

          case TokenKind.FLOAT:
            this._lexer.advance();

            return this.node(token, {
              kind: Kind.FLOAT,
              value: token.value,
            });

          case TokenKind.STRING:
          case TokenKind.BLOCK_STRING:
            return this.parseStringLiteral();

          case TokenKind.NAME:
            this._lexer.advance();

            switch (token.value) {
              case 'true':
                return this.node(token, {
                  kind: Kind.BOOLEAN,
                  value: true,
                });

              case 'false':
                return this.node(token, {
                  kind: Kind.BOOLEAN,
                  value: false,
                });

              case 'null':
                return this.node(token, {
                  kind: Kind.NULL,
                });

              default:
                return this.node(token, {
                  kind: Kind.ENUM,
                  value: token.value,
                });
            }

          case TokenKind.DOLLAR:
            if (isConst) {
              this.expectToken(TokenKind.DOLLAR);

              if (this._lexer.token.kind === TokenKind.NAME) {
                const varName = this._lexer.token.value;
                throw syntaxError(
                  this._lexer.source,
                  token.start,
                  `Unexpected variable "$${varName}" in constant value.`,
                );
              } else {
                throw this.unexpected(token);
              }
            }

            return this.parseVariable();

          default:
            throw this.unexpected();
        }
      }

      parseConstValueLiteral() {
        return this.parseValueLiteral(true);
      }

      parseStringLiteral() {
        const token = this._lexer.token;

        this._lexer.advance();

        return this.node(token, {
          kind: Kind.STRING,
          value: token.value,
          block: token.kind === TokenKind.BLOCK_STRING,
        });
      }
      /**
       * ListValue[Const] :
       *   - [ ]
       *   - [ Value[?Const]+ ]
       */

      parseList(isConst) {
        const item = () => this.parseValueLiteral(isConst);

        return this.node(this._lexer.token, {
          kind: Kind.LIST,
          values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R),
        });
      }
      /**
       * ```
       * ObjectValue[Const] :
       *   - { }
       *   - { ObjectField[?Const]+ }
       * ```
       */

      parseObject(isConst) {
        const item = () => this.parseObjectField(isConst);

        return this.node(this._lexer.token, {
          kind: Kind.OBJECT,
          fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R),
        });
      }
      /**
       * ObjectField[Const] : Name : Value[?Const]
       */

      parseObjectField(isConst) {
        const start = this._lexer.token;
        const name = this.parseName();
        this.expectToken(TokenKind.COLON);
        return this.node(start, {
          kind: Kind.OBJECT_FIELD,
          name,
          value: this.parseValueLiteral(isConst),
        });
      } // Implements the parsing rules in the Directives section.

      /**
       * Directives[Const] : Directive[?Const]+
       */

      parseDirectives(isConst) {
        const directives = [];

        while (this.peek(TokenKind.AT)) {
          directives.push(this.parseDirective(isConst));
        }

        return directives;
      }

      parseConstDirectives() {
        return this.parseDirectives(true);
      }
      /**
       * ```
       * Directive[Const] : @ Name Arguments[?Const]?
       * ```
       */

      parseDirective(isConst) {
        const start = this._lexer.token;
        this.expectToken(TokenKind.AT);
        return this.node(start, {
          kind: Kind.DIRECTIVE,
          name: this.parseName(),
          arguments: this.parseArguments(isConst),
        });
      } // Implements the parsing rules in the Types section.

      /**
       * Type :
       *   - NamedType
       *   - ListType
       *   - NonNullType
       */

      parseTypeReference() {
        const start = this._lexer.token;
        let type;

        if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
          const innerType = this.parseTypeReference();
          this.expectToken(TokenKind.BRACKET_R);
          type = this.node(start, {
            kind: Kind.LIST_TYPE,
            type: innerType,
          });
        } else {
          type = this.parseNamedType();
        }

        if (this.expectOptionalToken(TokenKind.BANG)) {
          return this.node(start, {
            kind: Kind.NON_NULL_TYPE,
            type,
          });
        }

        return type;
      }
      /**
       * NamedType : Name
       */

      parseNamedType() {
        return this.node(this._lexer.token, {
          kind: Kind.NAMED_TYPE,
          name: this.parseName(),
        });
      } // Implements the parsing rules in the Type Definition section.

      peekDescription() {
        return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
      }
      /**
       * Description : StringValue
       */

      parseDescription() {
        if (this.peekDescription()) {
          return this.parseStringLiteral();
        }
      }
      /**
       * ```
       * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
       * ```
       */

      parseSchemaDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword('schema');
        const directives = this.parseConstDirectives();
        const operationTypes = this.many(
          TokenKind.BRACE_L,
          this.parseOperationTypeDefinition,
          TokenKind.BRACE_R,
        );
        return this.node(start, {
          kind: Kind.SCHEMA_DEFINITION,
          description,
          directives,
          operationTypes,
        });
      }
      /**
       * OperationTypeDefinition : OperationType : NamedType
       */

      parseOperationTypeDefinition() {
        const start = this._lexer.token;
        const operation = this.parseOperationType();
        this.expectToken(TokenKind.COLON);
        const type = this.parseNamedType();
        return this.node(start, {
          kind: Kind.OPERATION_TYPE_DEFINITION,
          operation,
          type,
        });
      }
      /**
       * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
       */

      parseScalarTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword('scalar');
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        return this.node(start, {
          kind: Kind.SCALAR_TYPE_DEFINITION,
          description,
          name,
          directives,
        });
      }
      /**
       * ObjectTypeDefinition :
       *   Description?
       *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
       */

      parseObjectTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword('type');
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        return this.node(start, {
          kind: Kind.OBJECT_TYPE_DEFINITION,
          description,
          name,
          interfaces,
          directives,
          fields,
        });
      }
      /**
       * ImplementsInterfaces :
       *   - implements `&`? NamedType
       *   - ImplementsInterfaces & NamedType
       */

      parseImplementsInterfaces() {
        return this.expectOptionalKeyword('implements')
          ? this.delimitedMany(TokenKind.AMP, this.parseNamedType)
          : [];
      }
      /**
       * ```
       * FieldsDefinition : { FieldDefinition+ }
       * ```
       */

      parseFieldsDefinition() {
        return this.optionalMany(
          TokenKind.BRACE_L,
          this.parseFieldDefinition,
          TokenKind.BRACE_R,
        );
      }
      /**
       * FieldDefinition :
       *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
       */

      parseFieldDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        const name = this.parseName();
        const args = this.parseArgumentDefs();
        this.expectToken(TokenKind.COLON);
        const type = this.parseTypeReference();
        const directives = this.parseConstDirectives();
        return this.node(start, {
          kind: Kind.FIELD_DEFINITION,
          description,
          name,
          arguments: args,
          type,
          directives,
        });
      }
      /**
       * ArgumentsDefinition : ( InputValueDefinition+ )
       */

      parseArgumentDefs() {
        return this.optionalMany(
          TokenKind.PAREN_L,
          this.parseInputValueDef,
          TokenKind.PAREN_R,
        );
      }
      /**
       * InputValueDefinition :
       *   - Description? Name : Type DefaultValue? Directives[Const]?
       */

      parseInputValueDef() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        const name = this.parseName();
        this.expectToken(TokenKind.COLON);
        const type = this.parseTypeReference();
        let defaultValue;

        if (this.expectOptionalToken(TokenKind.EQUALS)) {
          defaultValue = this.parseConstValueLiteral();
        }

        const directives = this.parseConstDirectives();
        return this.node(start, {
          kind: Kind.INPUT_VALUE_DEFINITION,
          description,
          name,
          type,
          defaultValue,
          directives,
        });
      }
      /**
       * InterfaceTypeDefinition :
       *   - Description? interface Name Directives[Const]? FieldsDefinition?
       */

      parseInterfaceTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword('interface');
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        return this.node(start, {
          kind: Kind.INTERFACE_TYPE_DEFINITION,
          description,
          name,
          interfaces,
          directives,
          fields,
        });
      }
      /**
       * UnionTypeDefinition :
       *   - Description? union Name Directives[Const]? UnionMemberTypes?
       */

      parseUnionTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword('union');
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const types = this.parseUnionMemberTypes();
        return this.node(start, {
          kind: Kind.UNION_TYPE_DEFINITION,
          description,
          name,
          directives,
          types,
        });
      }
      /**
       * UnionMemberTypes :
       *   - = `|`? NamedType
       *   - UnionMemberTypes | NamedType
       */

      parseUnionMemberTypes() {
        return this.expectOptionalToken(TokenKind.EQUALS)
          ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType)
          : [];
      }
      /**
       * EnumTypeDefinition :
       *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
       */

      parseEnumTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword('enum');
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const values = this.parseEnumValuesDefinition();
        return this.node(start, {
          kind: Kind.ENUM_TYPE_DEFINITION,
          description,
          name,
          directives,
          values,
        });
      }
      /**
       * ```
       * EnumValuesDefinition : { EnumValueDefinition+ }
       * ```
       */

      parseEnumValuesDefinition() {
        return this.optionalMany(
          TokenKind.BRACE_L,
          this.parseEnumValueDefinition,
          TokenKind.BRACE_R,
        );
      }
      /**
       * EnumValueDefinition : Description? EnumValue Directives[Const]?
       */

      parseEnumValueDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        const name = this.parseEnumValueName();
        const directives = this.parseConstDirectives();
        return this.node(start, {
          kind: Kind.ENUM_VALUE_DEFINITION,
          description,
          name,
          directives,
        });
      }
      /**
       * EnumValue : Name but not `true`, `false` or `null`
       */

      parseEnumValueName() {
        if (
          this._lexer.token.value === 'true' ||
          this._lexer.token.value === 'false' ||
          this._lexer.token.value === 'null'
        ) {
          throw syntaxError(
            this._lexer.source,
            this._lexer.token.start,
            `${getTokenDesc(
          this._lexer.token,
        )} is reserved and cannot be used for an enum value.`,
          );
        }

        return this.parseName();
      }
      /**
       * InputObjectTypeDefinition :
       *   - Description? input Name Directives[Const]? InputFieldsDefinition?
       */

      parseInputObjectTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword('input');
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const fields = this.parseInputFieldsDefinition();
        return this.node(start, {
          kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
          description,
          name,
          directives,
          fields,
        });
      }
      /**
       * ```
       * InputFieldsDefinition : { InputValueDefinition+ }
       * ```
       */

      parseInputFieldsDefinition() {
        return this.optionalMany(
          TokenKind.BRACE_L,
          this.parseInputValueDef,
          TokenKind.BRACE_R,
        );
      }
      /**
       * TypeSystemExtension :
       *   - SchemaExtension
       *   - TypeExtension
       *
       * TypeExtension :
       *   - ScalarTypeExtension
       *   - ObjectTypeExtension
       *   - InterfaceTypeExtension
       *   - UnionTypeExtension
       *   - EnumTypeExtension
       *   - InputObjectTypeDefinition
       */

      parseTypeSystemExtension() {
        const keywordToken = this._lexer.lookahead();

        if (keywordToken.kind === TokenKind.NAME) {
          switch (keywordToken.value) {
            case 'schema':
              return this.parseSchemaExtension();

            case 'scalar':
              return this.parseScalarTypeExtension();

            case 'type':
              return this.parseObjectTypeExtension();

            case 'interface':
              return this.parseInterfaceTypeExtension();

            case 'union':
              return this.parseUnionTypeExtension();

            case 'enum':
              return this.parseEnumTypeExtension();

            case 'input':
              return this.parseInputObjectTypeExtension();
          }
        }

        throw this.unexpected(keywordToken);
      }
      /**
       * ```
       * SchemaExtension :
       *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
       *  - extend schema Directives[Const]
       * ```
       */

      parseSchemaExtension() {
        const start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('schema');
        const directives = this.parseConstDirectives();
        const operationTypes = this.optionalMany(
          TokenKind.BRACE_L,
          this.parseOperationTypeDefinition,
          TokenKind.BRACE_R,
        );

        if (directives.length === 0 && operationTypes.length === 0) {
          throw this.unexpected();
        }

        return this.node(start, {
          kind: Kind.SCHEMA_EXTENSION,
          directives,
          operationTypes,
        });
      }
      /**
       * ScalarTypeExtension :
       *   - extend scalar Name Directives[Const]
       */

      parseScalarTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('scalar');
        const name = this.parseName();
        const directives = this.parseConstDirectives();

        if (directives.length === 0) {
          throw this.unexpected();
        }

        return this.node(start, {
          kind: Kind.SCALAR_TYPE_EXTENSION,
          name,
          directives,
        });
      }
      /**
       * ObjectTypeExtension :
       *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
       *  - extend type Name ImplementsInterfaces? Directives[Const]
       *  - extend type Name ImplementsInterfaces
       */

      parseObjectTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('type');
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();

        if (
          interfaces.length === 0 &&
          directives.length === 0 &&
          fields.length === 0
        ) {
          throw this.unexpected();
        }

        return this.node(start, {
          kind: Kind.OBJECT_TYPE_EXTENSION,
          name,
          interfaces,
          directives,
          fields,
        });
      }
      /**
       * InterfaceTypeExtension :
       *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
       *  - extend interface Name ImplementsInterfaces? Directives[Const]
       *  - extend interface Name ImplementsInterfaces
       */

      parseInterfaceTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('interface');
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();

        if (
          interfaces.length === 0 &&
          directives.length === 0 &&
          fields.length === 0
        ) {
          throw this.unexpected();
        }

        return this.node(start, {
          kind: Kind.INTERFACE_TYPE_EXTENSION,
          name,
          interfaces,
          directives,
          fields,
        });
      }
      /**
       * UnionTypeExtension :
       *   - extend union Name Directives[Const]? UnionMemberTypes
       *   - extend union Name Directives[Const]
       */

      parseUnionTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('union');
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const types = this.parseUnionMemberTypes();

        if (directives.length === 0 && types.length === 0) {
          throw this.unexpected();
        }

        return this.node(start, {
          kind: Kind.UNION_TYPE_EXTENSION,
          name,
          directives,
          types,
        });
      }
      /**
       * EnumTypeExtension :
       *   - extend enum Name Directives[Const]? EnumValuesDefinition
       *   - extend enum Name Directives[Const]
       */

      parseEnumTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('enum');
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const values = this.parseEnumValuesDefinition();

        if (directives.length === 0 && values.length === 0) {
          throw this.unexpected();
        }

        return this.node(start, {
          kind: Kind.ENUM_TYPE_EXTENSION,
          name,
          directives,
          values,
        });
      }
      /**
       * InputObjectTypeExtension :
       *   - extend input Name Directives[Const]? InputFieldsDefinition
       *   - extend input Name Directives[Const]
       */

      parseInputObjectTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('input');
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const fields = this.parseInputFieldsDefinition();

        if (directives.length === 0 && fields.length === 0) {
          throw this.unexpected();
        }

        return this.node(start, {
          kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
          name,
          directives,
          fields,
        });
      }
      /**
       * ```
       * DirectiveDefinition :
       *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
       * ```
       */

      parseDirectiveDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword('directive');
        this.expectToken(TokenKind.AT);
        const name = this.parseName();
        const args = this.parseArgumentDefs();
        const repeatable = this.expectOptionalKeyword('repeatable');
        this.expectKeyword('on');
        const locations = this.parseDirectiveLocations();
        return this.node(start, {
          kind: Kind.DIRECTIVE_DEFINITION,
          description,
          name,
          arguments: args,
          repeatable,
          locations,
        });
      }
      /**
       * DirectiveLocations :
       *   - `|`? DirectiveLocation
       *   - DirectiveLocations | DirectiveLocation
       */

      parseDirectiveLocations() {
        return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
      }
      /*
       * DirectiveLocation :
       *   - ExecutableDirectiveLocation
       *   - TypeSystemDirectiveLocation
       *
       * ExecutableDirectiveLocation : one of
       *   `QUERY`
       *   `MUTATION`
       *   `SUBSCRIPTION`
       *   `FIELD`
       *   `FRAGMENT_DEFINITION`
       *   `FRAGMENT_SPREAD`
       *   `INLINE_FRAGMENT`
       *
       * TypeSystemDirectiveLocation : one of
       *   `SCHEMA`
       *   `SCALAR`
       *   `OBJECT`
       *   `FIELD_DEFINITION`
       *   `ARGUMENT_DEFINITION`
       *   `INTERFACE`
       *   `UNION`
       *   `ENUM`
       *   `ENUM_VALUE`
       *   `INPUT_OBJECT`
       *   `INPUT_FIELD_DEFINITION`
       */

      parseDirectiveLocation() {
        const start = this._lexer.token;
        const name = this.parseName();

        if (Object.prototype.hasOwnProperty.call(DirectiveLocation, name.value)) {
          return name;
        }

        throw this.unexpected(start);
      } // Core parsing utility functions

      /**
       * Returns a node that, if configured to do so, sets a "loc" field as a
       * location object, used to identify the place in the source that created a
       * given parsed object.
       */

      node(startToken, node) {
        var _this$_options2;

        if (
          ((_this$_options2 = this._options) === null || _this$_options2 === void 0
            ? void 0
            : _this$_options2.noLocation) !== true
        ) {
          node.loc = new Location(
            startToken,
            this._lexer.lastToken,
            this._lexer.source,
          );
        }

        return node;
      }
      /**
       * Determines if the next token is of a given kind
       */

      peek(kind) {
        return this._lexer.token.kind === kind;
      }
      /**
       * If the next token is of the given kind, return that token after advancing the lexer.
       * Otherwise, do not change the parser state and throw an error.
       */

      expectToken(kind) {
        const token = this._lexer.token;

        if (token.kind === kind) {
          this._lexer.advance();

          return token;
        }

        throw syntaxError(
          this._lexer.source,
          token.start,
          `Expected ${getTokenKindDesc(kind)}, found ${getTokenDesc(token)}.`,
        );
      }
      /**
       * If the next token is of the given kind, return "true" after advancing the lexer.
       * Otherwise, do not change the parser state and return "false".
       */

      expectOptionalToken(kind) {
        const token = this._lexer.token;

        if (token.kind === kind) {
          this._lexer.advance();

          return true;
        }

        return false;
      }
      /**
       * If the next token is a given keyword, advance the lexer.
       * Otherwise, do not change the parser state and throw an error.
       */

      expectKeyword(value) {
        const token = this._lexer.token;

        if (token.kind === TokenKind.NAME && token.value === value) {
          this._lexer.advance();
        } else {
          throw syntaxError(
            this._lexer.source,
            token.start,
            `Expected "${value}", found ${getTokenDesc(token)}.`,
          );
        }
      }
      /**
       * If the next token is a given keyword, return "true" after advancing the lexer.
       * Otherwise, do not change the parser state and return "false".
       */

      expectOptionalKeyword(value) {
        const token = this._lexer.token;

        if (token.kind === TokenKind.NAME && token.value === value) {
          this._lexer.advance();

          return true;
        }

        return false;
      }
      /**
       * Helper function for creating an error when an unexpected lexed token is encountered.
       */

      unexpected(atToken) {
        const token =
          atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
        return syntaxError(
          this._lexer.source,
          token.start,
          `Unexpected ${getTokenDesc(token)}.`,
        );
      }
      /**
       * Returns a possibly empty list of parse nodes, determined by the parseFn.
       * This list begins with a lex token of openKind and ends with a lex token of closeKind.
       * Advances the parser to the next lex token after the closing token.
       */

      any(openKind, parseFn, closeKind) {
        this.expectToken(openKind);
        const nodes = [];

        while (!this.expectOptionalToken(closeKind)) {
          nodes.push(parseFn.call(this));
        }

        return nodes;
      }
      /**
       * Returns a list of parse nodes, determined by the parseFn.
       * It can be empty only if open token is missing otherwise it will always return non-empty list
       * that begins with a lex token of openKind and ends with a lex token of closeKind.
       * Advances the parser to the next lex token after the closing token.
       */

      optionalMany(openKind, parseFn, closeKind) {
        if (this.expectOptionalToken(openKind)) {
          const nodes = [];

          do {
            nodes.push(parseFn.call(this));
          } while (!this.expectOptionalToken(closeKind));

          return nodes;
        }

        return [];
      }
      /**
       * Returns a non-empty list of parse nodes, determined by the parseFn.
       * This list begins with a lex token of openKind and ends with a lex token of closeKind.
       * Advances the parser to the next lex token after the closing token.
       */

      many(openKind, parseFn, closeKind) {
        this.expectToken(openKind);
        const nodes = [];

        do {
          nodes.push(parseFn.call(this));
        } while (!this.expectOptionalToken(closeKind));

        return nodes;
      }
      /**
       * Returns a non-empty list of parse nodes, determined by the parseFn.
       * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
       * Advances the parser to the next lex token after last item in the list.
       */

      delimitedMany(delimiterKind, parseFn) {
        this.expectOptionalToken(delimiterKind);
        const nodes = [];

        do {
          nodes.push(parseFn.call(this));
        } while (this.expectOptionalToken(delimiterKind));

        return nodes;
      }
    }
    /**
     * A helper function to describe a token as a string for debugging.
     */

    function getTokenDesc(token) {
      const value = token.value;
      return getTokenKindDesc(token.kind) + (value != null ? ` "${value}"` : '');
    }
    /**
     * A helper function to describe a token kind as a string for debugging.
     */

    function getTokenKindDesc(kind) {
      return isPunctuatorTokenKind(kind) ? `"${kind}"` : kind;
    }

    /**
     * Prints a string as a GraphQL StringValue literal. Replaces control characters
     * and excluded characters (" U+0022 and \\ U+005C) with escape sequences.
     */
    function printString(str) {
      return `"${str.replace(escapedRegExp, escapedReplacer)}"`;
    } // eslint-disable-next-line no-control-regex

    const escapedRegExp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;

    function escapedReplacer(str) {
      return escapeSequences[str.charCodeAt(0)];
    } // prettier-ignore

    const escapeSequences = [
      '\\u0000',
      '\\u0001',
      '\\u0002',
      '\\u0003',
      '\\u0004',
      '\\u0005',
      '\\u0006',
      '\\u0007',
      '\\b',
      '\\t',
      '\\n',
      '\\u000B',
      '\\f',
      '\\r',
      '\\u000E',
      '\\u000F',
      '\\u0010',
      '\\u0011',
      '\\u0012',
      '\\u0013',
      '\\u0014',
      '\\u0015',
      '\\u0016',
      '\\u0017',
      '\\u0018',
      '\\u0019',
      '\\u001A',
      '\\u001B',
      '\\u001C',
      '\\u001D',
      '\\u001E',
      '\\u001F',
      '',
      '',
      '\\"',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '', // 2F
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '', // 3F
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '', // 4F
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '\\\\',
      '',
      '',
      '', // 5F
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '', // 6F
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '\\u007F',
      '\\u0080',
      '\\u0081',
      '\\u0082',
      '\\u0083',
      '\\u0084',
      '\\u0085',
      '\\u0086',
      '\\u0087',
      '\\u0088',
      '\\u0089',
      '\\u008A',
      '\\u008B',
      '\\u008C',
      '\\u008D',
      '\\u008E',
      '\\u008F',
      '\\u0090',
      '\\u0091',
      '\\u0092',
      '\\u0093',
      '\\u0094',
      '\\u0095',
      '\\u0096',
      '\\u0097',
      '\\u0098',
      '\\u0099',
      '\\u009A',
      '\\u009B',
      '\\u009C',
      '\\u009D',
      '\\u009E',
      '\\u009F',
    ];

    /**
     * A visitor is provided to visit, it contains the collection of
     * relevant functions to be called during the visitor's traversal.
     */

    const BREAK = Object.freeze({});
    /**
     * visit() will walk through an AST using a depth-first traversal, calling
     * the visitor's enter function at each node in the traversal, and calling the
     * leave function after visiting that node and all of its child nodes.
     *
     * By returning different values from the enter and leave functions, the
     * behavior of the visitor can be altered, including skipping over a sub-tree of
     * the AST (by returning false), editing the AST by returning a value or null
     * to remove the value, or to stop the whole traversal by returning BREAK.
     *
     * When using visit() to edit an AST, the original AST will not be modified, and
     * a new version of the AST with the changes applied will be returned from the
     * visit function.
     *
     * ```ts
     * const editedAST = visit(ast, {
     *   enter(node, key, parent, path, ancestors) {
     *     // @return
     *     //   undefined: no action
     *     //   false: skip visiting this node
     *     //   visitor.BREAK: stop visiting altogether
     *     //   null: delete this node
     *     //   any value: replace this node with the returned value
     *   },
     *   leave(node, key, parent, path, ancestors) {
     *     // @return
     *     //   undefined: no action
     *     //   false: no action
     *     //   visitor.BREAK: stop visiting altogether
     *     //   null: delete this node
     *     //   any value: replace this node with the returned value
     *   }
     * });
     * ```
     *
     * Alternatively to providing enter() and leave() functions, a visitor can
     * instead provide functions named the same as the kinds of AST nodes, or
     * enter/leave visitors at a named key, leading to three permutations of the
     * visitor API:
     *
     * 1) Named visitors triggered when entering a node of a specific kind.
     *
     * ```ts
     * visit(ast, {
     *   Kind(node) {
     *     // enter the "Kind" node
     *   }
     * })
     * ```
     *
     * 2) Named visitors that trigger upon entering and leaving a node of a specific kind.
     *
     * ```ts
     * visit(ast, {
     *   Kind: {
     *     enter(node) {
     *       // enter the "Kind" node
     *     }
     *     leave(node) {
     *       // leave the "Kind" node
     *     }
     *   }
     * })
     * ```
     *
     * 3) Generic visitors that trigger upon entering and leaving any node.
     *
     * ```ts
     * visit(ast, {
     *   enter(node) {
     *     // enter any node
     *   },
     *   leave(node) {
     *     // leave any node
     *   }
     * })
     * ```
     */

    function visit(root, visitor, visitorKeys = QueryDocumentKeys) {
      const enterLeaveMap = new Map();

      for (const kind of Object.values(Kind)) {
        enterLeaveMap.set(kind, getEnterLeaveForKind(visitor, kind));
      }
      /* eslint-disable no-undef-init */

      let stack = undefined;
      let inArray = Array.isArray(root);
      let keys = [root];
      let index = -1;
      let edits = [];
      let node = root;
      let key = undefined;
      let parent = undefined;
      const path = [];
      const ancestors = [];
      /* eslint-enable no-undef-init */

      do {
        index++;
        const isLeaving = index === keys.length;
        const isEdited = isLeaving && edits.length !== 0;

        if (isLeaving) {
          key = ancestors.length === 0 ? undefined : path[path.length - 1];
          node = parent;
          parent = ancestors.pop();

          if (isEdited) {
            if (inArray) {
              node = node.slice();
              let editOffset = 0;

              for (const [editKey, editValue] of edits) {
                const arrayKey = editKey - editOffset;

                if (editValue === null) {
                  node.splice(arrayKey, 1);
                  editOffset++;
                } else {
                  node[arrayKey] = editValue;
                }
              }
            } else {
              node = Object.defineProperties(
                {},
                Object.getOwnPropertyDescriptors(node),
              );

              for (const [editKey, editValue] of edits) {
                node[editKey] = editValue;
              }
            }
          }

          index = stack.index;
          keys = stack.keys;
          edits = stack.edits;
          inArray = stack.inArray;
          stack = stack.prev;
        } else if (parent) {
          key = inArray ? index : keys[index];
          node = parent[key];

          if (node === null || node === undefined) {
            continue;
          }

          path.push(key);
        }

        let result;

        if (!Array.isArray(node)) {
          var _enterLeaveMap$get, _enterLeaveMap$get2;

          isNode(node) || devAssert(false, `Invalid AST Node: ${inspect(node)}.`);
          const visitFn = isLeaving
            ? (_enterLeaveMap$get = enterLeaveMap.get(node.kind)) === null ||
              _enterLeaveMap$get === void 0
              ? void 0
              : _enterLeaveMap$get.leave
            : (_enterLeaveMap$get2 = enterLeaveMap.get(node.kind)) === null ||
              _enterLeaveMap$get2 === void 0
            ? void 0
            : _enterLeaveMap$get2.enter;
          result =
            visitFn === null || visitFn === void 0
              ? void 0
              : visitFn.call(visitor, node, key, parent, path, ancestors);

          if (result === BREAK) {
            break;
          }

          if (result === false) {
            if (!isLeaving) {
              path.pop();
              continue;
            }
          } else if (result !== undefined) {
            edits.push([key, result]);

            if (!isLeaving) {
              if (isNode(result)) {
                node = result;
              } else {
                path.pop();
                continue;
              }
            }
          }
        }

        if (result === undefined && isEdited) {
          edits.push([key, node]);
        }

        if (isLeaving) {
          path.pop();
        } else {
          var _node$kind;

          stack = {
            inArray,
            index,
            keys,
            edits,
            prev: stack,
          };
          inArray = Array.isArray(node);
          keys = inArray
            ? node
            : (_node$kind = visitorKeys[node.kind]) !== null &&
              _node$kind !== void 0
            ? _node$kind
            : [];
          index = -1;
          edits = [];

          if (parent) {
            ancestors.push(parent);
          }

          parent = node;
        }
      } while (stack !== undefined);

      if (edits.length !== 0) {
        // New root
        return edits[edits.length - 1][1];
      }

      return root;
    }
    /**
     * Given a visitor instance and a node kind, return EnterLeaveVisitor for that kind.
     */

    function getEnterLeaveForKind(visitor, kind) {
      const kindVisitor = visitor[kind];

      if (typeof kindVisitor === 'object') {
        // { Kind: { enter() {}, leave() {} } }
        return kindVisitor;
      } else if (typeof kindVisitor === 'function') {
        // { Kind() {} }
        return {
          enter: kindVisitor,
          leave: undefined,
        };
      } // { enter() {}, leave() {} }

      return {
        enter: visitor.enter,
        leave: visitor.leave,
      };
    }

    /**
     * Converts an AST into a string, using one set of reasonable
     * formatting rules.
     */

    function print(ast) {
      return visit(ast, printDocASTReducer);
    }
    const MAX_LINE_LENGTH = 80;
    const printDocASTReducer = {
      Name: {
        leave: (node) => node.value,
      },
      Variable: {
        leave: (node) => '$' + node.name,
      },
      // Document
      Document: {
        leave: (node) => join(node.definitions, '\n\n'),
      },
      OperationDefinition: {
        leave(node) {
          const varDefs = wrap$1('(', join(node.variableDefinitions, ', '), ')');
          const prefix = join(
            [
              node.operation,
              join([node.name, varDefs]),
              join(node.directives, ' '),
            ],
            ' ',
          ); // Anonymous queries with no directives or variable definitions can use
          // the query short form.

          return (prefix === 'query' ? '' : prefix + ' ') + node.selectionSet;
        },
      },
      VariableDefinition: {
        leave: ({ variable, type, defaultValue, directives }) =>
          variable +
          ': ' +
          type +
          wrap$1(' = ', defaultValue) +
          wrap$1(' ', join(directives, ' ')),
      },
      SelectionSet: {
        leave: ({ selections }) => block(selections),
      },
      Field: {
        leave({ alias, name, arguments: args, directives, selectionSet }) {
          const prefix = wrap$1('', alias, ': ') + name;
          let argsLine = prefix + wrap$1('(', join(args, ', '), ')');

          if (argsLine.length > MAX_LINE_LENGTH) {
            argsLine = prefix + wrap$1('(\n', indent(join(args, '\n')), '\n)');
          }

          return join([argsLine, join(directives, ' '), selectionSet], ' ');
        },
      },
      Argument: {
        leave: ({ name, value }) => name + ': ' + value,
      },
      // Fragments
      FragmentSpread: {
        leave: ({ name, directives }) =>
          '...' + name + wrap$1(' ', join(directives, ' ')),
      },
      InlineFragment: {
        leave: ({ typeCondition, directives, selectionSet }) =>
          join(
            [
              '...',
              wrap$1('on ', typeCondition),
              join(directives, ' '),
              selectionSet,
            ],
            ' ',
          ),
      },
      FragmentDefinition: {
        leave: (
          { name, typeCondition, variableDefinitions, directives, selectionSet }, // Note: fragment variable definitions are experimental and may be changed
        ) =>
          // or removed in the future.
          `fragment ${name}${wrap$1('(', join(variableDefinitions, ', '), ')')} ` +
          `on ${typeCondition} ${wrap$1('', join(directives, ' '), ' ')}` +
          selectionSet,
      },
      // Value
      IntValue: {
        leave: ({ value }) => value,
      },
      FloatValue: {
        leave: ({ value }) => value,
      },
      StringValue: {
        leave: ({ value, block: isBlockString }) =>
          isBlockString ? printBlockString(value) : printString(value),
      },
      BooleanValue: {
        leave: ({ value }) => (value ? 'true' : 'false'),
      },
      NullValue: {
        leave: () => 'null',
      },
      EnumValue: {
        leave: ({ value }) => value,
      },
      ListValue: {
        leave: ({ values }) => '[' + join(values, ', ') + ']',
      },
      ObjectValue: {
        leave: ({ fields }) => '{' + join(fields, ', ') + '}',
      },
      ObjectField: {
        leave: ({ name, value }) => name + ': ' + value,
      },
      // Directive
      Directive: {
        leave: ({ name, arguments: args }) =>
          '@' + name + wrap$1('(', join(args, ', '), ')'),
      },
      // Type
      NamedType: {
        leave: ({ name }) => name,
      },
      ListType: {
        leave: ({ type }) => '[' + type + ']',
      },
      NonNullType: {
        leave: ({ type }) => type + '!',
      },
      // Type System Definitions
      SchemaDefinition: {
        leave: ({ description, directives, operationTypes }) =>
          wrap$1('', description, '\n') +
          join(['schema', join(directives, ' '), block(operationTypes)], ' '),
      },
      OperationTypeDefinition: {
        leave: ({ operation, type }) => operation + ': ' + type,
      },
      ScalarTypeDefinition: {
        leave: ({ description, name, directives }) =>
          wrap$1('', description, '\n') +
          join(['scalar', name, join(directives, ' ')], ' '),
      },
      ObjectTypeDefinition: {
        leave: ({ description, name, interfaces, directives, fields }) =>
          wrap$1('', description, '\n') +
          join(
            [
              'type',
              name,
              wrap$1('implements ', join(interfaces, ' & ')),
              join(directives, ' '),
              block(fields),
            ],
            ' ',
          ),
      },
      FieldDefinition: {
        leave: ({ description, name, arguments: args, type, directives }) =>
          wrap$1('', description, '\n') +
          name +
          (hasMultilineItems(args)
            ? wrap$1('(\n', indent(join(args, '\n')), '\n)')
            : wrap$1('(', join(args, ', '), ')')) +
          ': ' +
          type +
          wrap$1(' ', join(directives, ' ')),
      },
      InputValueDefinition: {
        leave: ({ description, name, type, defaultValue, directives }) =>
          wrap$1('', description, '\n') +
          join(
            [name + ': ' + type, wrap$1('= ', defaultValue), join(directives, ' ')],
            ' ',
          ),
      },
      InterfaceTypeDefinition: {
        leave: ({ description, name, interfaces, directives, fields }) =>
          wrap$1('', description, '\n') +
          join(
            [
              'interface',
              name,
              wrap$1('implements ', join(interfaces, ' & ')),
              join(directives, ' '),
              block(fields),
            ],
            ' ',
          ),
      },
      UnionTypeDefinition: {
        leave: ({ description, name, directives, types }) =>
          wrap$1('', description, '\n') +
          join(
            ['union', name, join(directives, ' '), wrap$1('= ', join(types, ' | '))],
            ' ',
          ),
      },
      EnumTypeDefinition: {
        leave: ({ description, name, directives, values }) =>
          wrap$1('', description, '\n') +
          join(['enum', name, join(directives, ' '), block(values)], ' '),
      },
      EnumValueDefinition: {
        leave: ({ description, name, directives }) =>
          wrap$1('', description, '\n') + join([name, join(directives, ' ')], ' '),
      },
      InputObjectTypeDefinition: {
        leave: ({ description, name, directives, fields }) =>
          wrap$1('', description, '\n') +
          join(['input', name, join(directives, ' '), block(fields)], ' '),
      },
      DirectiveDefinition: {
        leave: ({ description, name, arguments: args, repeatable, locations }) =>
          wrap$1('', description, '\n') +
          'directive @' +
          name +
          (hasMultilineItems(args)
            ? wrap$1('(\n', indent(join(args, '\n')), '\n)')
            : wrap$1('(', join(args, ', '), ')')) +
          (repeatable ? ' repeatable' : '') +
          ' on ' +
          join(locations, ' | '),
      },
      SchemaExtension: {
        leave: ({ directives, operationTypes }) =>
          join(
            ['extend schema', join(directives, ' '), block(operationTypes)],
            ' ',
          ),
      },
      ScalarTypeExtension: {
        leave: ({ name, directives }) =>
          join(['extend scalar', name, join(directives, ' ')], ' '),
      },
      ObjectTypeExtension: {
        leave: ({ name, interfaces, directives, fields }) =>
          join(
            [
              'extend type',
              name,
              wrap$1('implements ', join(interfaces, ' & ')),
              join(directives, ' '),
              block(fields),
            ],
            ' ',
          ),
      },
      InterfaceTypeExtension: {
        leave: ({ name, interfaces, directives, fields }) =>
          join(
            [
              'extend interface',
              name,
              wrap$1('implements ', join(interfaces, ' & ')),
              join(directives, ' '),
              block(fields),
            ],
            ' ',
          ),
      },
      UnionTypeExtension: {
        leave: ({ name, directives, types }) =>
          join(
            [
              'extend union',
              name,
              join(directives, ' '),
              wrap$1('= ', join(types, ' | ')),
            ],
            ' ',
          ),
      },
      EnumTypeExtension: {
        leave: ({ name, directives, values }) =>
          join(['extend enum', name, join(directives, ' '), block(values)], ' '),
      },
      InputObjectTypeExtension: {
        leave: ({ name, directives, fields }) =>
          join(['extend input', name, join(directives, ' '), block(fields)], ' '),
      },
    };
    /**
     * Given maybeArray, print an empty string if it is null or empty, otherwise
     * print all items together separated by separator if provided
     */

    function join(maybeArray, separator = '') {
      var _maybeArray$filter$jo;

      return (_maybeArray$filter$jo =
        maybeArray === null || maybeArray === void 0
          ? void 0
          : maybeArray.filter((x) => x).join(separator)) !== null &&
        _maybeArray$filter$jo !== void 0
        ? _maybeArray$filter$jo
        : '';
    }
    /**
     * Given array, print each item on its own line, wrapped in an indented `{ }` block.
     */

    function block(array) {
      return wrap$1('{\n', indent(join(array, '\n')), '\n}');
    }
    /**
     * If maybeString is not null or empty, then wrap with start and end, otherwise print an empty string.
     */

    function wrap$1(start, maybeString, end = '') {
      return maybeString != null && maybeString !== ''
        ? start + maybeString + end
        : '';
    }

    function indent(str) {
      return wrap$1('  ', str.replace(/\n/g, '\n  '));
    }

    function hasMultilineItems(maybeArray) {
      var _maybeArray$some;

      // FIXME: https://github.com/graphql/graphql-js/issues/2203

      /* c8 ignore next */
      return (_maybeArray$some =
        maybeArray === null || maybeArray === void 0
          ? void 0
          : maybeArray.some((str) => str.includes('\n'))) !== null &&
        _maybeArray$some !== void 0
        ? _maybeArray$some
        : false;
    }

    function removeTemporaryGlobals() {
        return typeof Source === "function" ? remove() : remove();
    }

    function checkDEV() {
        __DEV__ ? invariant$1("boolean" === typeof DEV, DEV) : invariant$1("boolean" === typeof DEV, 36);
    }
    removeTemporaryGlobals();
    checkDEV();

    function shouldInclude(_a, variables) {
        var directives = _a.directives;
        if (!directives || !directives.length) {
            return true;
        }
        return getInclusionDirectives(directives).every(function (_a) {
            var directive = _a.directive, ifArgument = _a.ifArgument;
            var evaledValue = false;
            if (ifArgument.value.kind === 'Variable') {
                evaledValue = variables && variables[ifArgument.value.name.value];
                __DEV__ ? invariant$1(evaledValue !== void 0, "Invalid variable referenced in @".concat(directive.name.value, " directive.")) : invariant$1(evaledValue !== void 0, 37);
            }
            else {
                evaledValue = ifArgument.value.value;
            }
            return directive.name.value === 'skip' ? !evaledValue : evaledValue;
        });
    }
    function getDirectiveNames(root) {
        var names = [];
        visit(root, {
            Directive: function (node) {
                names.push(node.name.value);
            },
        });
        return names;
    }
    function hasDirectives(names, root) {
        return getDirectiveNames(root).some(function (name) { return names.indexOf(name) > -1; });
    }
    function hasClientExports(document) {
        return (document &&
            hasDirectives(['client'], document) &&
            hasDirectives(['export'], document));
    }
    function isInclusionDirective(_a) {
        var value = _a.name.value;
        return value === 'skip' || value === 'include';
    }
    function getInclusionDirectives(directives) {
        var result = [];
        if (directives && directives.length) {
            directives.forEach(function (directive) {
                if (!isInclusionDirective(directive))
                    return;
                var directiveArguments = directive.arguments;
                var directiveName = directive.name.value;
                __DEV__ ? invariant$1(directiveArguments && directiveArguments.length === 1, "Incorrect number of arguments for the @".concat(directiveName, " directive.")) : invariant$1(directiveArguments && directiveArguments.length === 1, 38);
                var ifArgument = directiveArguments[0];
                __DEV__ ? invariant$1(ifArgument.name && ifArgument.name.value === 'if', "Invalid argument for the @".concat(directiveName, " directive.")) : invariant$1(ifArgument.name && ifArgument.name.value === 'if', 39);
                var ifValue = ifArgument.value;
                __DEV__ ? invariant$1(ifValue &&
                    (ifValue.kind === 'Variable' || ifValue.kind === 'BooleanValue'), "Argument for the @".concat(directiveName, " directive must be a variable or a boolean value.")) : invariant$1(ifValue &&
                    (ifValue.kind === 'Variable' || ifValue.kind === 'BooleanValue'), 40);
                result.push({ directive: directive, ifArgument: ifArgument });
            });
        }
        return result;
    }

    function getFragmentQueryDocument(document, fragmentName) {
        var actualFragmentName = fragmentName;
        var fragments = [];
        document.definitions.forEach(function (definition) {
            if (definition.kind === 'OperationDefinition') {
                throw __DEV__ ? new InvariantError("Found a ".concat(definition.operation, " operation").concat(definition.name ? " named '".concat(definition.name.value, "'") : '', ". ") +
                    'No operations are allowed when using a fragment as a query. Only fragments are allowed.') : new InvariantError(41);
            }
            if (definition.kind === 'FragmentDefinition') {
                fragments.push(definition);
            }
        });
        if (typeof actualFragmentName === 'undefined') {
            __DEV__ ? invariant$1(fragments.length === 1, "Found ".concat(fragments.length, " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.")) : invariant$1(fragments.length === 1, 42);
            actualFragmentName = fragments[0].name.value;
        }
        var query = __assign(__assign({}, document), { definitions: __spreadArray([
                {
                    kind: 'OperationDefinition',
                    operation: 'query',
                    selectionSet: {
                        kind: 'SelectionSet',
                        selections: [
                            {
                                kind: 'FragmentSpread',
                                name: {
                                    kind: 'Name',
                                    value: actualFragmentName,
                                },
                            },
                        ],
                    },
                }
            ], document.definitions, true) });
        return query;
    }
    function createFragmentMap(fragments) {
        if (fragments === void 0) { fragments = []; }
        var symTable = {};
        fragments.forEach(function (fragment) {
            symTable[fragment.name.value] = fragment;
        });
        return symTable;
    }
    function getFragmentFromSelection(selection, fragmentMap) {
        switch (selection.kind) {
            case 'InlineFragment':
                return selection;
            case 'FragmentSpread': {
                var fragment = fragmentMap && fragmentMap[selection.name.value];
                __DEV__ ? invariant$1(fragment, "No fragment named ".concat(selection.name.value, ".")) : invariant$1(fragment, 43);
                return fragment;
            }
            default:
                return null;
        }
    }

    function isNonNullObject(obj) {
        return obj !== null && typeof obj === 'object';
    }

    function makeReference(id) {
        return { __ref: String(id) };
    }
    function isReference(obj) {
        return Boolean(obj && typeof obj === 'object' && typeof obj.__ref === 'string');
    }
    function isDocumentNode(value) {
        return (isNonNullObject(value) &&
            value.kind === "Document" &&
            Array.isArray(value.definitions));
    }
    function isStringValue(value) {
        return value.kind === 'StringValue';
    }
    function isBooleanValue(value) {
        return value.kind === 'BooleanValue';
    }
    function isIntValue(value) {
        return value.kind === 'IntValue';
    }
    function isFloatValue(value) {
        return value.kind === 'FloatValue';
    }
    function isVariable(value) {
        return value.kind === 'Variable';
    }
    function isObjectValue(value) {
        return value.kind === 'ObjectValue';
    }
    function isListValue(value) {
        return value.kind === 'ListValue';
    }
    function isEnumValue(value) {
        return value.kind === 'EnumValue';
    }
    function isNullValue(value) {
        return value.kind === 'NullValue';
    }
    function valueToObjectRepresentation(argObj, name, value, variables) {
        if (isIntValue(value) || isFloatValue(value)) {
            argObj[name.value] = Number(value.value);
        }
        else if (isBooleanValue(value) || isStringValue(value)) {
            argObj[name.value] = value.value;
        }
        else if (isObjectValue(value)) {
            var nestedArgObj_1 = {};
            value.fields.map(function (obj) {
                return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables);
            });
            argObj[name.value] = nestedArgObj_1;
        }
        else if (isVariable(value)) {
            var variableValue = (variables || {})[value.name.value];
            argObj[name.value] = variableValue;
        }
        else if (isListValue(value)) {
            argObj[name.value] = value.values.map(function (listValue) {
                var nestedArgArrayObj = {};
                valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
                return nestedArgArrayObj[name.value];
            });
        }
        else if (isEnumValue(value)) {
            argObj[name.value] = value.value;
        }
        else if (isNullValue(value)) {
            argObj[name.value] = null;
        }
        else {
            throw __DEV__ ? new InvariantError("The inline argument \"".concat(name.value, "\" of kind \"").concat(value.kind, "\"") +
                'is not supported. Use variables instead of inline arguments to ' +
                'overcome this limitation.') : new InvariantError(52);
        }
    }
    function storeKeyNameFromField(field, variables) {
        var directivesObj = null;
        if (field.directives) {
            directivesObj = {};
            field.directives.forEach(function (directive) {
                directivesObj[directive.name.value] = {};
                if (directive.arguments) {
                    directive.arguments.forEach(function (_a) {
                        var name = _a.name, value = _a.value;
                        return valueToObjectRepresentation(directivesObj[directive.name.value], name, value, variables);
                    });
                }
            });
        }
        var argObj = null;
        if (field.arguments && field.arguments.length) {
            argObj = {};
            field.arguments.forEach(function (_a) {
                var name = _a.name, value = _a.value;
                return valueToObjectRepresentation(argObj, name, value, variables);
            });
        }
        return getStoreKeyName(field.name.value, argObj, directivesObj);
    }
    var KNOWN_DIRECTIVES = [
        'connection',
        'include',
        'skip',
        'client',
        'rest',
        'export',
    ];
    var getStoreKeyName = Object.assign(function (fieldName, args, directives) {
        if (args &&
            directives &&
            directives['connection'] &&
            directives['connection']['key']) {
            if (directives['connection']['filter'] &&
                directives['connection']['filter'].length > 0) {
                var filterKeys = directives['connection']['filter']
                    ? directives['connection']['filter']
                    : [];
                filterKeys.sort();
                var filteredArgs_1 = {};
                filterKeys.forEach(function (key) {
                    filteredArgs_1[key] = args[key];
                });
                return "".concat(directives['connection']['key'], "(").concat(stringify(filteredArgs_1), ")");
            }
            else {
                return directives['connection']['key'];
            }
        }
        var completeFieldName = fieldName;
        if (args) {
            var stringifiedArgs = stringify(args);
            completeFieldName += "(".concat(stringifiedArgs, ")");
        }
        if (directives) {
            Object.keys(directives).forEach(function (key) {
                if (KNOWN_DIRECTIVES.indexOf(key) !== -1)
                    return;
                if (directives[key] && Object.keys(directives[key]).length) {
                    completeFieldName += "@".concat(key, "(").concat(stringify(directives[key]), ")");
                }
                else {
                    completeFieldName += "@".concat(key);
                }
            });
        }
        return completeFieldName;
    }, {
        setStringify: function (s) {
            var previous = stringify;
            stringify = s;
            return previous;
        },
    });
    var stringify = function defaultStringify(value) {
        return JSON.stringify(value, stringifyReplacer);
    };
    function stringifyReplacer(_key, value) {
        if (isNonNullObject(value) && !Array.isArray(value)) {
            value = Object.keys(value).sort().reduce(function (copy, key) {
                copy[key] = value[key];
                return copy;
            }, {});
        }
        return value;
    }
    function argumentsObjectFromField(field, variables) {
        if (field.arguments && field.arguments.length) {
            var argObj_1 = {};
            field.arguments.forEach(function (_a) {
                var name = _a.name, value = _a.value;
                return valueToObjectRepresentation(argObj_1, name, value, variables);
            });
            return argObj_1;
        }
        return null;
    }
    function resultKeyNameFromField(field) {
        return field.alias ? field.alias.value : field.name.value;
    }
    function getTypenameFromResult(result, selectionSet, fragmentMap) {
        if (typeof result.__typename === 'string') {
            return result.__typename;
        }
        for (var _i = 0, _a = selectionSet.selections; _i < _a.length; _i++) {
            var selection = _a[_i];
            if (isField(selection)) {
                if (selection.name.value === '__typename') {
                    return result[resultKeyNameFromField(selection)];
                }
            }
            else {
                var typename = getTypenameFromResult(result, getFragmentFromSelection(selection, fragmentMap).selectionSet, fragmentMap);
                if (typeof typename === 'string') {
                    return typename;
                }
            }
        }
    }
    function isField(selection) {
        return selection.kind === 'Field';
    }
    function isInlineFragment(selection) {
        return selection.kind === 'InlineFragment';
    }

    function checkDocument(doc) {
        __DEV__ ? invariant$1(doc && doc.kind === 'Document', "Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql") : invariant$1(doc && doc.kind === 'Document', 44);
        var operations = doc.definitions
            .filter(function (d) { return d.kind !== 'FragmentDefinition'; })
            .map(function (definition) {
            if (definition.kind !== 'OperationDefinition') {
                throw __DEV__ ? new InvariantError("Schema type definitions not allowed in queries. Found: \"".concat(definition.kind, "\"")) : new InvariantError(45);
            }
            return definition;
        });
        __DEV__ ? invariant$1(operations.length <= 1, "Ambiguous GraphQL document: contains ".concat(operations.length, " operations")) : invariant$1(operations.length <= 1, 46);
        return doc;
    }
    function getOperationDefinition(doc) {
        checkDocument(doc);
        return doc.definitions.filter(function (definition) { return definition.kind === 'OperationDefinition'; })[0];
    }
    function getOperationName(doc) {
        return (doc.definitions
            .filter(function (definition) {
            return definition.kind === 'OperationDefinition' && definition.name;
        })
            .map(function (x) { return x.name.value; })[0] || null);
    }
    function getFragmentDefinitions(doc) {
        return doc.definitions.filter(function (definition) { return definition.kind === 'FragmentDefinition'; });
    }
    function getQueryDefinition(doc) {
        var queryDef = getOperationDefinition(doc);
        __DEV__ ? invariant$1(queryDef && queryDef.operation === 'query', 'Must contain a query definition.') : invariant$1(queryDef && queryDef.operation === 'query', 47);
        return queryDef;
    }
    function getFragmentDefinition(doc) {
        __DEV__ ? invariant$1(doc.kind === 'Document', "Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql") : invariant$1(doc.kind === 'Document', 48);
        __DEV__ ? invariant$1(doc.definitions.length <= 1, 'Fragment must have exactly one definition.') : invariant$1(doc.definitions.length <= 1, 49);
        var fragmentDef = doc.definitions[0];
        __DEV__ ? invariant$1(fragmentDef.kind === 'FragmentDefinition', 'Must be a fragment definition.') : invariant$1(fragmentDef.kind === 'FragmentDefinition', 50);
        return fragmentDef;
    }
    function getMainDefinition(queryDoc) {
        checkDocument(queryDoc);
        var fragmentDefinition;
        for (var _i = 0, _a = queryDoc.definitions; _i < _a.length; _i++) {
            var definition = _a[_i];
            if (definition.kind === 'OperationDefinition') {
                var operation = definition.operation;
                if (operation === 'query' ||
                    operation === 'mutation' ||
                    operation === 'subscription') {
                    return definition;
                }
            }
            if (definition.kind === 'FragmentDefinition' && !fragmentDefinition) {
                fragmentDefinition = definition;
            }
        }
        if (fragmentDefinition) {
            return fragmentDefinition;
        }
        throw __DEV__ ? new InvariantError('Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.') : new InvariantError(51);
    }
    function getDefaultValues(definition) {
        var defaultValues = Object.create(null);
        var defs = definition && definition.variableDefinitions;
        if (defs && defs.length) {
            defs.forEach(function (def) {
                if (def.defaultValue) {
                    valueToObjectRepresentation(defaultValues, def.variable.name, def.defaultValue);
                }
            });
        }
        return defaultValues;
    }

    function filterInPlace(array, test, context) {
        var target = 0;
        array.forEach(function (elem, i) {
            if (test.call(this, elem, i, array)) {
                array[target++] = elem;
            }
        }, context);
        array.length = target;
        return array;
    }

    var TYPENAME_FIELD = {
        kind: 'Field',
        name: {
            kind: 'Name',
            value: '__typename',
        },
    };
    function isEmpty(op, fragments) {
        return op.selectionSet.selections.every(function (selection) {
            return selection.kind === 'FragmentSpread' &&
                isEmpty(fragments[selection.name.value], fragments);
        });
    }
    function nullIfDocIsEmpty(doc) {
        return isEmpty(getOperationDefinition(doc) || getFragmentDefinition(doc), createFragmentMap(getFragmentDefinitions(doc)))
            ? null
            : doc;
    }
    function getDirectiveMatcher(directives) {
        return function directiveMatcher(directive) {
            return directives.some(function (dir) {
                return (dir.name && dir.name === directive.name.value) ||
                    (dir.test && dir.test(directive));
            });
        };
    }
    function removeDirectivesFromDocument(directives, doc) {
        var variablesInUse = Object.create(null);
        var variablesToRemove = [];
        var fragmentSpreadsInUse = Object.create(null);
        var fragmentSpreadsToRemove = [];
        var modifiedDoc = nullIfDocIsEmpty(visit(doc, {
            Variable: {
                enter: function (node, _key, parent) {
                    if (parent.kind !== 'VariableDefinition') {
                        variablesInUse[node.name.value] = true;
                    }
                },
            },
            Field: {
                enter: function (node) {
                    if (directives && node.directives) {
                        var shouldRemoveField = directives.some(function (directive) { return directive.remove; });
                        if (shouldRemoveField &&
                            node.directives &&
                            node.directives.some(getDirectiveMatcher(directives))) {
                            if (node.arguments) {
                                node.arguments.forEach(function (arg) {
                                    if (arg.value.kind === 'Variable') {
                                        variablesToRemove.push({
                                            name: arg.value.name.value,
                                        });
                                    }
                                });
                            }
                            if (node.selectionSet) {
                                getAllFragmentSpreadsFromSelectionSet(node.selectionSet).forEach(function (frag) {
                                    fragmentSpreadsToRemove.push({
                                        name: frag.name.value,
                                    });
                                });
                            }
                            return null;
                        }
                    }
                },
            },
            FragmentSpread: {
                enter: function (node) {
                    fragmentSpreadsInUse[node.name.value] = true;
                },
            },
            Directive: {
                enter: function (node) {
                    if (getDirectiveMatcher(directives)(node)) {
                        return null;
                    }
                },
            },
        }));
        if (modifiedDoc &&
            filterInPlace(variablesToRemove, function (v) { return !!v.name && !variablesInUse[v.name]; }).length) {
            modifiedDoc = removeArgumentsFromDocument(variablesToRemove, modifiedDoc);
        }
        if (modifiedDoc &&
            filterInPlace(fragmentSpreadsToRemove, function (fs) { return !!fs.name && !fragmentSpreadsInUse[fs.name]; })
                .length) {
            modifiedDoc = removeFragmentSpreadFromDocument(fragmentSpreadsToRemove, modifiedDoc);
        }
        return modifiedDoc;
    }
    var addTypenameToDocument = Object.assign(function (doc) {
        return visit(doc, {
            SelectionSet: {
                enter: function (node, _key, parent) {
                    if (parent &&
                        parent.kind === 'OperationDefinition') {
                        return;
                    }
                    var selections = node.selections;
                    if (!selections) {
                        return;
                    }
                    var skip = selections.some(function (selection) {
                        return (isField(selection) &&
                            (selection.name.value === '__typename' ||
                                selection.name.value.lastIndexOf('__', 0) === 0));
                    });
                    if (skip) {
                        return;
                    }
                    var field = parent;
                    if (isField(field) &&
                        field.directives &&
                        field.directives.some(function (d) { return d.name.value === 'export'; })) {
                        return;
                    }
                    return __assign(__assign({}, node), { selections: __spreadArray(__spreadArray([], selections, true), [TYPENAME_FIELD], false) });
                },
            },
        });
    }, {
        added: function (field) {
            return field === TYPENAME_FIELD;
        },
    });
    var connectionRemoveConfig = {
        test: function (directive) {
            var willRemove = directive.name.value === 'connection';
            if (willRemove) {
                if (!directive.arguments ||
                    !directive.arguments.some(function (arg) { return arg.name.value === 'key'; })) {
                    __DEV__ && invariant$1.warn('Removing an @connection directive even though it does not have a key. ' +
                        'You may want to use the key parameter to specify a store key.');
                }
            }
            return willRemove;
        },
    };
    function removeConnectionDirectiveFromDocument(doc) {
        return removeDirectivesFromDocument([connectionRemoveConfig], checkDocument(doc));
    }
    function getArgumentMatcher(config) {
        return function argumentMatcher(argument) {
            return config.some(function (aConfig) {
                return argument.value &&
                    argument.value.kind === 'Variable' &&
                    argument.value.name &&
                    (aConfig.name === argument.value.name.value ||
                        (aConfig.test && aConfig.test(argument)));
            });
        };
    }
    function removeArgumentsFromDocument(config, doc) {
        var argMatcher = getArgumentMatcher(config);
        return nullIfDocIsEmpty(visit(doc, {
            OperationDefinition: {
                enter: function (node) {
                    return __assign(__assign({}, node), { variableDefinitions: node.variableDefinitions ? node.variableDefinitions.filter(function (varDef) {
                            return !config.some(function (arg) { return arg.name === varDef.variable.name.value; });
                        }) : [] });
                },
            },
            Field: {
                enter: function (node) {
                    var shouldRemoveField = config.some(function (argConfig) { return argConfig.remove; });
                    if (shouldRemoveField) {
                        var argMatchCount_1 = 0;
                        if (node.arguments) {
                            node.arguments.forEach(function (arg) {
                                if (argMatcher(arg)) {
                                    argMatchCount_1 += 1;
                                }
                            });
                        }
                        if (argMatchCount_1 === 1) {
                            return null;
                        }
                    }
                },
            },
            Argument: {
                enter: function (node) {
                    if (argMatcher(node)) {
                        return null;
                    }
                },
            },
        }));
    }
    function removeFragmentSpreadFromDocument(config, doc) {
        function enter(node) {
            if (config.some(function (def) { return def.name === node.name.value; })) {
                return null;
            }
        }
        return nullIfDocIsEmpty(visit(doc, {
            FragmentSpread: { enter: enter },
            FragmentDefinition: { enter: enter },
        }));
    }
    function getAllFragmentSpreadsFromSelectionSet(selectionSet) {
        var allFragments = [];
        selectionSet.selections.forEach(function (selection) {
            if ((isField(selection) || isInlineFragment(selection)) &&
                selection.selectionSet) {
                getAllFragmentSpreadsFromSelectionSet(selection.selectionSet).forEach(function (frag) { return allFragments.push(frag); });
            }
            else if (selection.kind === 'FragmentSpread') {
                allFragments.push(selection);
            }
        });
        return allFragments;
    }
    function buildQueryFromSelectionSet(document) {
        var definition = getMainDefinition(document);
        var definitionOperation = definition.operation;
        if (definitionOperation === 'query') {
            return document;
        }
        var modifiedDoc = visit(document, {
            OperationDefinition: {
                enter: function (node) {
                    return __assign(__assign({}, node), { operation: 'query' });
                },
            },
        });
        return modifiedDoc;
    }
    function removeClientSetsFromDocument(document) {
        checkDocument(document);
        var modifiedDoc = removeDirectivesFromDocument([
            {
                test: function (directive) { return directive.name.value === 'client'; },
                remove: true,
            },
        ], document);
        if (modifiedDoc) {
            modifiedDoc = visit(modifiedDoc, {
                FragmentDefinition: {
                    enter: function (node) {
                        if (node.selectionSet) {
                            var isTypenameOnly = node.selectionSet.selections.every(function (selection) {
                                return isField(selection) && selection.name.value === '__typename';
                            });
                            if (isTypenameOnly) {
                                return null;
                            }
                        }
                    },
                },
            });
        }
        return modifiedDoc;
    }

    var hasOwnProperty$5 = Object.prototype.hasOwnProperty;
    function mergeDeep() {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        return mergeDeepArray(sources);
    }
    function mergeDeepArray(sources) {
        var target = sources[0] || {};
        var count = sources.length;
        if (count > 1) {
            var merger = new DeepMerger();
            for (var i = 1; i < count; ++i) {
                target = merger.merge(target, sources[i]);
            }
        }
        return target;
    }
    var defaultReconciler = function (target, source, property) {
        return this.merge(target[property], source[property]);
    };
    var DeepMerger = (function () {
        function DeepMerger(reconciler) {
            if (reconciler === void 0) { reconciler = defaultReconciler; }
            this.reconciler = reconciler;
            this.isObject = isNonNullObject;
            this.pastCopies = new Set();
        }
        DeepMerger.prototype.merge = function (target, source) {
            var _this = this;
            var context = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                context[_i - 2] = arguments[_i];
            }
            if (isNonNullObject(source) && isNonNullObject(target)) {
                Object.keys(source).forEach(function (sourceKey) {
                    if (hasOwnProperty$5.call(target, sourceKey)) {
                        var targetValue = target[sourceKey];
                        if (source[sourceKey] !== targetValue) {
                            var result = _this.reconciler.apply(_this, __spreadArray([target, source, sourceKey], context, false));
                            if (result !== targetValue) {
                                target = _this.shallowCopyForMerge(target);
                                target[sourceKey] = result;
                            }
                        }
                    }
                    else {
                        target = _this.shallowCopyForMerge(target);
                        target[sourceKey] = source[sourceKey];
                    }
                });
                return target;
            }
            return source;
        };
        DeepMerger.prototype.shallowCopyForMerge = function (value) {
            if (isNonNullObject(value)) {
                if (!this.pastCopies.has(value)) {
                    if (Array.isArray(value)) {
                        value = value.slice(0);
                    }
                    else {
                        value = __assign({ __proto__: Object.getPrototypeOf(value) }, value);
                    }
                    this.pastCopies.add(value);
                }
            }
            return value;
        };
        return DeepMerger;
    }());

    function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

    // === Symbol Support ===
    var hasSymbols = function () {
      return typeof Symbol === 'function';
    };

    var hasSymbol = function (name) {
      return hasSymbols() && Boolean(Symbol[name]);
    };

    var getSymbol = function (name) {
      return hasSymbol(name) ? Symbol[name] : '@@' + name;
    };

    if (hasSymbols() && !hasSymbol('observable')) {
      Symbol.observable = Symbol('observable');
    }

    var SymbolIterator = getSymbol('iterator');
    var SymbolObservable = getSymbol('observable');
    var SymbolSpecies = getSymbol('species'); // === Abstract Operations ===

    function getMethod(obj, key) {
      var value = obj[key];
      if (value == null) return undefined;
      if (typeof value !== 'function') throw new TypeError(value + ' is not a function');
      return value;
    }

    function getSpecies(obj) {
      var ctor = obj.constructor;

      if (ctor !== undefined) {
        ctor = ctor[SymbolSpecies];

        if (ctor === null) {
          ctor = undefined;
        }
      }

      return ctor !== undefined ? ctor : Observable;
    }

    function isObservable(x) {
      return x instanceof Observable; // SPEC: Brand check
    }

    function hostReportError(e) {
      if (hostReportError.log) {
        hostReportError.log(e);
      } else {
        setTimeout(function () {
          throw e;
        });
      }
    }

    function enqueue(fn) {
      Promise.resolve().then(function () {
        try {
          fn();
        } catch (e) {
          hostReportError(e);
        }
      });
    }

    function cleanupSubscription(subscription) {
      var cleanup = subscription._cleanup;
      if (cleanup === undefined) return;
      subscription._cleanup = undefined;

      if (!cleanup) {
        return;
      }

      try {
        if (typeof cleanup === 'function') {
          cleanup();
        } else {
          var unsubscribe = getMethod(cleanup, 'unsubscribe');

          if (unsubscribe) {
            unsubscribe.call(cleanup);
          }
        }
      } catch (e) {
        hostReportError(e);
      }
    }

    function closeSubscription(subscription) {
      subscription._observer = undefined;
      subscription._queue = undefined;
      subscription._state = 'closed';
    }

    function flushSubscription(subscription) {
      var queue = subscription._queue;

      if (!queue) {
        return;
      }

      subscription._queue = undefined;
      subscription._state = 'ready';

      for (var i = 0; i < queue.length; ++i) {
        notifySubscription(subscription, queue[i].type, queue[i].value);
        if (subscription._state === 'closed') break;
      }
    }

    function notifySubscription(subscription, type, value) {
      subscription._state = 'running';
      var observer = subscription._observer;

      try {
        var m = getMethod(observer, type);

        switch (type) {
          case 'next':
            if (m) m.call(observer, value);
            break;

          case 'error':
            closeSubscription(subscription);
            if (m) m.call(observer, value);else throw value;
            break;

          case 'complete':
            closeSubscription(subscription);
            if (m) m.call(observer);
            break;
        }
      } catch (e) {
        hostReportError(e);
      }

      if (subscription._state === 'closed') cleanupSubscription(subscription);else if (subscription._state === 'running') subscription._state = 'ready';
    }

    function onNotify(subscription, type, value) {
      if (subscription._state === 'closed') return;

      if (subscription._state === 'buffering') {
        subscription._queue.push({
          type: type,
          value: value
        });

        return;
      }

      if (subscription._state !== 'ready') {
        subscription._state = 'buffering';
        subscription._queue = [{
          type: type,
          value: value
        }];
        enqueue(function () {
          return flushSubscription(subscription);
        });
        return;
      }

      notifySubscription(subscription, type, value);
    }

    var Subscription = /*#__PURE__*/function () {
      function Subscription(observer, subscriber) {
        // ASSERT: observer is an object
        // ASSERT: subscriber is callable
        this._cleanup = undefined;
        this._observer = observer;
        this._queue = undefined;
        this._state = 'initializing';
        var subscriptionObserver = new SubscriptionObserver(this);

        try {
          this._cleanup = subscriber.call(undefined, subscriptionObserver);
        } catch (e) {
          subscriptionObserver.error(e);
        }

        if (this._state === 'initializing') this._state = 'ready';
      }

      var _proto = Subscription.prototype;

      _proto.unsubscribe = function unsubscribe() {
        if (this._state !== 'closed') {
          closeSubscription(this);
          cleanupSubscription(this);
        }
      };

      _createClass(Subscription, [{
        key: "closed",
        get: function () {
          return this._state === 'closed';
        }
      }]);

      return Subscription;
    }();

    var SubscriptionObserver = /*#__PURE__*/function () {
      function SubscriptionObserver(subscription) {
        this._subscription = subscription;
      }

      var _proto2 = SubscriptionObserver.prototype;

      _proto2.next = function next(value) {
        onNotify(this._subscription, 'next', value);
      };

      _proto2.error = function error(value) {
        onNotify(this._subscription, 'error', value);
      };

      _proto2.complete = function complete() {
        onNotify(this._subscription, 'complete');
      };

      _createClass(SubscriptionObserver, [{
        key: "closed",
        get: function () {
          return this._subscription._state === 'closed';
        }
      }]);

      return SubscriptionObserver;
    }();

    var Observable = /*#__PURE__*/function () {
      function Observable(subscriber) {
        if (!(this instanceof Observable)) throw new TypeError('Observable cannot be called as a function');
        if (typeof subscriber !== 'function') throw new TypeError('Observable initializer must be a function');
        this._subscriber = subscriber;
      }

      var _proto3 = Observable.prototype;

      _proto3.subscribe = function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          observer = {
            next: observer,
            error: arguments[1],
            complete: arguments[2]
          };
        }

        return new Subscription(observer, this._subscriber);
      };

      _proto3.forEach = function forEach(fn) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          if (typeof fn !== 'function') {
            reject(new TypeError(fn + ' is not a function'));
            return;
          }

          function done() {
            subscription.unsubscribe();
            resolve();
          }

          var subscription = _this.subscribe({
            next: function (value) {
              try {
                fn(value, done);
              } catch (e) {
                reject(e);
                subscription.unsubscribe();
              }
            },
            error: reject,
            complete: resolve
          });
        });
      };

      _proto3.map = function map(fn) {
        var _this2 = this;

        if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
        var C = getSpecies(this);
        return new C(function (observer) {
          return _this2.subscribe({
            next: function (value) {
              try {
                value = fn(value);
              } catch (e) {
                return observer.error(e);
              }

              observer.next(value);
            },
            error: function (e) {
              observer.error(e);
            },
            complete: function () {
              observer.complete();
            }
          });
        });
      };

      _proto3.filter = function filter(fn) {
        var _this3 = this;

        if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
        var C = getSpecies(this);
        return new C(function (observer) {
          return _this3.subscribe({
            next: function (value) {
              try {
                if (!fn(value)) return;
              } catch (e) {
                return observer.error(e);
              }

              observer.next(value);
            },
            error: function (e) {
              observer.error(e);
            },
            complete: function () {
              observer.complete();
            }
          });
        });
      };

      _proto3.reduce = function reduce(fn) {
        var _this4 = this;

        if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
        var C = getSpecies(this);
        var hasSeed = arguments.length > 1;
        var hasValue = false;
        var seed = arguments[1];
        var acc = seed;
        return new C(function (observer) {
          return _this4.subscribe({
            next: function (value) {
              var first = !hasValue;
              hasValue = true;

              if (!first || hasSeed) {
                try {
                  acc = fn(acc, value);
                } catch (e) {
                  return observer.error(e);
                }
              } else {
                acc = value;
              }
            },
            error: function (e) {
              observer.error(e);
            },
            complete: function () {
              if (!hasValue && !hasSeed) return observer.error(new TypeError('Cannot reduce an empty sequence'));
              observer.next(acc);
              observer.complete();
            }
          });
        });
      };

      _proto3.concat = function concat() {
        var _this5 = this;

        for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
          sources[_key] = arguments[_key];
        }

        var C = getSpecies(this);
        return new C(function (observer) {
          var subscription;
          var index = 0;

          function startNext(next) {
            subscription = next.subscribe({
              next: function (v) {
                observer.next(v);
              },
              error: function (e) {
                observer.error(e);
              },
              complete: function () {
                if (index === sources.length) {
                  subscription = undefined;
                  observer.complete();
                } else {
                  startNext(C.from(sources[index++]));
                }
              }
            });
          }

          startNext(_this5);
          return function () {
            if (subscription) {
              subscription.unsubscribe();
              subscription = undefined;
            }
          };
        });
      };

      _proto3.flatMap = function flatMap(fn) {
        var _this6 = this;

        if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
        var C = getSpecies(this);
        return new C(function (observer) {
          var subscriptions = [];

          var outer = _this6.subscribe({
            next: function (value) {
              if (fn) {
                try {
                  value = fn(value);
                } catch (e) {
                  return observer.error(e);
                }
              }

              var inner = C.from(value).subscribe({
                next: function (value) {
                  observer.next(value);
                },
                error: function (e) {
                  observer.error(e);
                },
                complete: function () {
                  var i = subscriptions.indexOf(inner);
                  if (i >= 0) subscriptions.splice(i, 1);
                  completeIfDone();
                }
              });
              subscriptions.push(inner);
            },
            error: function (e) {
              observer.error(e);
            },
            complete: function () {
              completeIfDone();
            }
          });

          function completeIfDone() {
            if (outer.closed && subscriptions.length === 0) observer.complete();
          }

          return function () {
            subscriptions.forEach(function (s) {
              return s.unsubscribe();
            });
            outer.unsubscribe();
          };
        });
      };

      _proto3[SymbolObservable] = function () {
        return this;
      };

      Observable.from = function from(x) {
        var C = typeof this === 'function' ? this : Observable;
        if (x == null) throw new TypeError(x + ' is not an object');
        var method = getMethod(x, SymbolObservable);

        if (method) {
          var observable = method.call(x);
          if (Object(observable) !== observable) throw new TypeError(observable + ' is not an object');
          if (isObservable(observable) && observable.constructor === C) return observable;
          return new C(function (observer) {
            return observable.subscribe(observer);
          });
        }

        if (hasSymbol('iterator')) {
          method = getMethod(x, SymbolIterator);

          if (method) {
            return new C(function (observer) {
              enqueue(function () {
                if (observer.closed) return;

                for (var _iterator = _createForOfIteratorHelperLoose(method.call(x)), _step; !(_step = _iterator()).done;) {
                  var item = _step.value;
                  observer.next(item);
                  if (observer.closed) return;
                }

                observer.complete();
              });
            });
          }
        }

        if (Array.isArray(x)) {
          return new C(function (observer) {
            enqueue(function () {
              if (observer.closed) return;

              for (var i = 0; i < x.length; ++i) {
                observer.next(x[i]);
                if (observer.closed) return;
              }

              observer.complete();
            });
          });
        }

        throw new TypeError(x + ' is not observable');
      };

      Observable.of = function of() {
        for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          items[_key2] = arguments[_key2];
        }

        var C = typeof this === 'function' ? this : Observable;
        return new C(function (observer) {
          enqueue(function () {
            if (observer.closed) return;

            for (var i = 0; i < items.length; ++i) {
              observer.next(items[i]);
              if (observer.closed) return;
            }

            observer.complete();
          });
        });
      };

      _createClass(Observable, null, [{
        key: SymbolSpecies,
        get: function () {
          return this;
        }
      }]);

      return Observable;
    }();

    if (hasSymbols()) {
      Object.defineProperty(Observable, Symbol('extensions'), {
        value: {
          symbol: SymbolObservable,
          hostReportError: hostReportError
        },
        configurable: true
      });
    }

    function symbolObservablePonyfill(root) {
    	var result;
    	var Symbol = root.Symbol;

    	if (typeof Symbol === 'function') {
    		if (Symbol.observable) {
    			result = Symbol.observable;
    		} else {

    			if (typeof Symbol.for === 'function') {
    				// This just needs to be something that won't trample other user's Symbol.for use
    				// It also will guide people to the source of their issues, if this is problematic.
    				// META: It's a resource locator!
    				result = Symbol.for('https://github.com/benlesh/symbol-observable');
    			} else {
    				// Symbol.for didn't exist! The best we can do at this point is a totally 
    				// unique symbol. Note that the string argument here is a descriptor, not
    				// an identifier. This symbol is unique.
    				result = Symbol('https://github.com/benlesh/symbol-observable');
    			}
    			try {
    				Symbol.observable = result;
    			} catch (err) {
    				// Do nothing. In some environments, users have frozen `Symbol` for security reasons,
    				// if it is frozen assigning to it will throw. In this case, we don't care, because
    				// they will need to use the returned value from the ponyfill.
    			}
    		}
    	} else {
    		result = '@@observable';
    	}

    	return result;
    }

    /* global window */

    var root;

    if (typeof self !== 'undefined') {
      root = self;
    } else if (typeof window !== 'undefined') {
      root = window;
    } else if (typeof global !== 'undefined') {
      root = global;
    } else if (typeof module !== 'undefined') {
      root = module;
    } else {
      root = Function('return this')();
    }

    symbolObservablePonyfill(root);

    var prototype = Observable.prototype;
    var fakeObsSymbol = '@@observable';
    if (!prototype[fakeObsSymbol]) {
        prototype[fakeObsSymbol] = function () { return this; };
    }

    var toString$1 = Object.prototype.toString;
    function cloneDeep(value) {
        return cloneDeepHelper(value);
    }
    function cloneDeepHelper(val, seen) {
        switch (toString$1.call(val)) {
            case "[object Array]": {
                seen = seen || new Map;
                if (seen.has(val))
                    return seen.get(val);
                var copy_1 = val.slice(0);
                seen.set(val, copy_1);
                copy_1.forEach(function (child, i) {
                    copy_1[i] = cloneDeepHelper(child, seen);
                });
                return copy_1;
            }
            case "[object Object]": {
                seen = seen || new Map;
                if (seen.has(val))
                    return seen.get(val);
                var copy_2 = Object.create(Object.getPrototypeOf(val));
                seen.set(val, copy_2);
                Object.keys(val).forEach(function (key) {
                    copy_2[key] = cloneDeepHelper(val[key], seen);
                });
                return copy_2;
            }
            default:
                return val;
        }
    }

    function deepFreeze(value) {
        var workSet = new Set([value]);
        workSet.forEach(function (obj) {
            if (isNonNullObject(obj) && shallowFreeze(obj) === obj) {
                Object.getOwnPropertyNames(obj).forEach(function (name) {
                    if (isNonNullObject(obj[name]))
                        workSet.add(obj[name]);
                });
            }
        });
        return value;
    }
    function shallowFreeze(obj) {
        if (__DEV__ && !Object.isFrozen(obj)) {
            try {
                Object.freeze(obj);
            }
            catch (e) {
                if (e instanceof TypeError)
                    return null;
                throw e;
            }
        }
        return obj;
    }
    function maybeDeepFreeze(obj) {
        if (__DEV__) {
            deepFreeze(obj);
        }
        return obj;
    }

    function iterateObserversSafely(observers, method, argument) {
        var observersWithMethod = [];
        observers.forEach(function (obs) { return obs[method] && observersWithMethod.push(obs); });
        observersWithMethod.forEach(function (obs) { return obs[method](argument); });
    }

    function asyncMap(observable, mapFn, catchFn) {
        return new Observable(function (observer) {
            var next = observer.next, error = observer.error, complete = observer.complete;
            var activeCallbackCount = 0;
            var completed = false;
            var promiseQueue = {
                then: function (callback) {
                    return new Promise(function (resolve) { return resolve(callback()); });
                },
            };
            function makeCallback(examiner, delegate) {
                if (examiner) {
                    return function (arg) {
                        ++activeCallbackCount;
                        var both = function () { return examiner(arg); };
                        promiseQueue = promiseQueue.then(both, both).then(function (result) {
                            --activeCallbackCount;
                            next && next.call(observer, result);
                            if (completed) {
                                handler.complete();
                            }
                        }, function (error) {
                            --activeCallbackCount;
                            throw error;
                        }).catch(function (caught) {
                            error && error.call(observer, caught);
                        });
                    };
                }
                else {
                    return function (arg) { return delegate && delegate.call(observer, arg); };
                }
            }
            var handler = {
                next: makeCallback(mapFn, next),
                error: makeCallback(catchFn, error),
                complete: function () {
                    completed = true;
                    if (!activeCallbackCount) {
                        complete && complete.call(observer);
                    }
                },
            };
            var sub = observable.subscribe(handler);
            return function () { return sub.unsubscribe(); };
        });
    }

    var canUseWeakMap = typeof WeakMap === 'function' &&
        maybe$1(function () { return navigator.product; }) !== 'ReactNative';
    var canUseWeakSet = typeof WeakSet === 'function';
    var canUseSymbol = typeof Symbol === 'function' &&
        typeof Symbol.for === 'function';
    typeof maybe$1(function () { return window.document.createElement; }) === "function";
    maybe$1(function () { return navigator.userAgent.indexOf("jsdom") >= 0; }) || false;

    function fixObservableSubclass(subclass) {
        function set(key) {
            Object.defineProperty(subclass, key, { value: Observable });
        }
        if (canUseSymbol && Symbol.species) {
            set(Symbol.species);
        }
        set("@@species");
        return subclass;
    }

    function isPromiseLike(value) {
        return value && typeof value.then === "function";
    }
    var Concast = (function (_super) {
        __extends(Concast, _super);
        function Concast(sources) {
            var _this = _super.call(this, function (observer) {
                _this.addObserver(observer);
                return function () { return _this.removeObserver(observer); };
            }) || this;
            _this.observers = new Set();
            _this.addCount = 0;
            _this.promise = new Promise(function (resolve, reject) {
                _this.resolve = resolve;
                _this.reject = reject;
            });
            _this.handlers = {
                next: function (result) {
                    if (_this.sub !== null) {
                        _this.latest = ["next", result];
                        iterateObserversSafely(_this.observers, "next", result);
                    }
                },
                error: function (error) {
                    var sub = _this.sub;
                    if (sub !== null) {
                        if (sub)
                            setTimeout(function () { return sub.unsubscribe(); });
                        _this.sub = null;
                        _this.latest = ["error", error];
                        _this.reject(error);
                        iterateObserversSafely(_this.observers, "error", error);
                    }
                },
                complete: function () {
                    var sub = _this.sub;
                    if (sub !== null) {
                        var value = _this.sources.shift();
                        if (!value) {
                            if (sub)
                                setTimeout(function () { return sub.unsubscribe(); });
                            _this.sub = null;
                            if (_this.latest &&
                                _this.latest[0] === "next") {
                                _this.resolve(_this.latest[1]);
                            }
                            else {
                                _this.resolve();
                            }
                            iterateObserversSafely(_this.observers, "complete");
                        }
                        else if (isPromiseLike(value)) {
                            value.then(function (obs) { return _this.sub = obs.subscribe(_this.handlers); });
                        }
                        else {
                            _this.sub = value.subscribe(_this.handlers);
                        }
                    }
                },
            };
            _this.cancel = function (reason) {
                _this.reject(reason);
                _this.sources = [];
                _this.handlers.complete();
            };
            _this.promise.catch(function (_) { });
            if (typeof sources === "function") {
                sources = [new Observable(sources)];
            }
            if (isPromiseLike(sources)) {
                sources.then(function (iterable) { return _this.start(iterable); }, _this.handlers.error);
            }
            else {
                _this.start(sources);
            }
            return _this;
        }
        Concast.prototype.start = function (sources) {
            if (this.sub !== void 0)
                return;
            this.sources = Array.from(sources);
            this.handlers.complete();
        };
        Concast.prototype.deliverLastMessage = function (observer) {
            if (this.latest) {
                var nextOrError = this.latest[0];
                var method = observer[nextOrError];
                if (method) {
                    method.call(observer, this.latest[1]);
                }
                if (this.sub === null &&
                    nextOrError === "next" &&
                    observer.complete) {
                    observer.complete();
                }
            }
        };
        Concast.prototype.addObserver = function (observer) {
            if (!this.observers.has(observer)) {
                this.deliverLastMessage(observer);
                this.observers.add(observer);
                ++this.addCount;
            }
        };
        Concast.prototype.removeObserver = function (observer, quietly) {
            if (this.observers.delete(observer) &&
                --this.addCount < 1 &&
                !quietly) {
                this.handlers.complete();
            }
        };
        Concast.prototype.cleanup = function (callback) {
            var _this = this;
            var called = false;
            var once = function () {
                if (!called) {
                    called = true;
                    _this.observers.delete(observer);
                    callback();
                }
            };
            var observer = {
                next: once,
                error: once,
                complete: once,
            };
            var count = this.addCount;
            this.addObserver(observer);
            this.addCount = count;
        };
        return Concast;
    }(Observable));
    fixObservableSubclass(Concast);

    function isNonEmptyArray(value) {
        return Array.isArray(value) && value.length > 0;
    }

    function graphQLResultHasError(result) {
        return (result.errors && result.errors.length > 0) || false;
    }

    function compact() {
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i] = arguments[_i];
        }
        var result = Object.create(null);
        objects.forEach(function (obj) {
            if (!obj)
                return;
            Object.keys(obj).forEach(function (key) {
                var value = obj[key];
                if (value !== void 0) {
                    result[key] = value;
                }
            });
        });
        return result;
    }

    var prefixCounts = new Map();
    function makeUniqueId(prefix) {
        var count = prefixCounts.get(prefix) || 1;
        prefixCounts.set(prefix, count + 1);
        return "".concat(prefix, ":").concat(count, ":").concat(Math.random().toString(36).slice(2));
    }

    function stringifyForDisplay(value) {
        var undefId = makeUniqueId("stringifyForDisplay");
        return JSON.stringify(value, function (key, value) {
            return value === void 0 ? undefId : value;
        }).split(JSON.stringify(undefId)).join("<undefined>");
    }

    function mergeOptions(defaults, options) {
        return compact(defaults, options, options.variables && {
            variables: __assign(__assign({}, (defaults && defaults.variables)), options.variables),
        });
    }

    function fromError(errorValue) {
        return new Observable(function (observer) {
            observer.error(errorValue);
        });
    }

    var throwServerError = function (response, result, message) {
        var error = new Error(message);
        error.name = 'ServerError';
        error.response = response;
        error.statusCode = response.status;
        error.result = result;
        throw error;
    };

    function validateOperation(operation) {
        var OPERATION_FIELDS = [
            'query',
            'operationName',
            'variables',
            'extensions',
            'context',
        ];
        for (var _i = 0, _a = Object.keys(operation); _i < _a.length; _i++) {
            var key = _a[_i];
            if (OPERATION_FIELDS.indexOf(key) < 0) {
                throw __DEV__ ? new InvariantError("illegal argument: ".concat(key)) : new InvariantError(24);
            }
        }
        return operation;
    }

    function createOperation(starting, operation) {
        var context = __assign({}, starting);
        var setContext = function (next) {
            if (typeof next === 'function') {
                context = __assign(__assign({}, context), next(context));
            }
            else {
                context = __assign(__assign({}, context), next);
            }
        };
        var getContext = function () { return (__assign({}, context)); };
        Object.defineProperty(operation, 'setContext', {
            enumerable: false,
            value: setContext,
        });
        Object.defineProperty(operation, 'getContext', {
            enumerable: false,
            value: getContext,
        });
        return operation;
    }

    function transformOperation(operation) {
        var transformedOperation = {
            variables: operation.variables || {},
            extensions: operation.extensions || {},
            operationName: operation.operationName,
            query: operation.query,
        };
        if (!transformedOperation.operationName) {
            transformedOperation.operationName =
                typeof transformedOperation.query !== 'string'
                    ? getOperationName(transformedOperation.query) || undefined
                    : '';
        }
        return transformedOperation;
    }

    function passthrough(op, forward) {
        return (forward ? forward(op) : Observable.of());
    }
    function toLink(handler) {
        return typeof handler === 'function' ? new ApolloLink(handler) : handler;
    }
    function isTerminating(link) {
        return link.request.length <= 1;
    }
    var LinkError = (function (_super) {
        __extends(LinkError, _super);
        function LinkError(message, link) {
            var _this = _super.call(this, message) || this;
            _this.link = link;
            return _this;
        }
        return LinkError;
    }(Error));
    var ApolloLink = (function () {
        function ApolloLink(request) {
            if (request)
                this.request = request;
        }
        ApolloLink.empty = function () {
            return new ApolloLink(function () { return Observable.of(); });
        };
        ApolloLink.from = function (links) {
            if (links.length === 0)
                return ApolloLink.empty();
            return links.map(toLink).reduce(function (x, y) { return x.concat(y); });
        };
        ApolloLink.split = function (test, left, right) {
            var leftLink = toLink(left);
            var rightLink = toLink(right || new ApolloLink(passthrough));
            if (isTerminating(leftLink) && isTerminating(rightLink)) {
                return new ApolloLink(function (operation) {
                    return test(operation)
                        ? leftLink.request(operation) || Observable.of()
                        : rightLink.request(operation) || Observable.of();
                });
            }
            else {
                return new ApolloLink(function (operation, forward) {
                    return test(operation)
                        ? leftLink.request(operation, forward) || Observable.of()
                        : rightLink.request(operation, forward) || Observable.of();
                });
            }
        };
        ApolloLink.execute = function (link, operation) {
            return (link.request(createOperation(operation.context, transformOperation(validateOperation(operation)))) || Observable.of());
        };
        ApolloLink.concat = function (first, second) {
            var firstLink = toLink(first);
            if (isTerminating(firstLink)) {
                __DEV__ && invariant$1.warn(new LinkError("You are calling concat on a terminating link, which will have no effect", firstLink));
                return firstLink;
            }
            var nextLink = toLink(second);
            if (isTerminating(nextLink)) {
                return new ApolloLink(function (operation) {
                    return firstLink.request(operation, function (op) { return nextLink.request(op) || Observable.of(); }) || Observable.of();
                });
            }
            else {
                return new ApolloLink(function (operation, forward) {
                    return (firstLink.request(operation, function (op) {
                        return nextLink.request(op, forward) || Observable.of();
                    }) || Observable.of());
                });
            }
        };
        ApolloLink.prototype.split = function (test, left, right) {
            return this.concat(ApolloLink.split(test, left, right || new ApolloLink(passthrough)));
        };
        ApolloLink.prototype.concat = function (next) {
            return ApolloLink.concat(this, next);
        };
        ApolloLink.prototype.request = function (operation, forward) {
            throw __DEV__ ? new InvariantError('request is not implemented') : new InvariantError(19);
        };
        ApolloLink.prototype.onError = function (error, observer) {
            if (observer && observer.error) {
                observer.error(error);
                return false;
            }
            throw error;
        };
        ApolloLink.prototype.setOnError = function (fn) {
            this.onError = fn;
            return this;
        };
        return ApolloLink;
    }());

    var execute = ApolloLink.execute;

    var version = '3.6.8';

    var hasOwnProperty$4 = Object.prototype.hasOwnProperty;
    function parseAndCheckHttpResponse(operations) {
        return function (response) { return response
            .text()
            .then(function (bodyText) {
            try {
                return JSON.parse(bodyText);
            }
            catch (err) {
                var parseError = err;
                parseError.name = 'ServerParseError';
                parseError.response = response;
                parseError.statusCode = response.status;
                parseError.bodyText = bodyText;
                throw parseError;
            }
        })
            .then(function (result) {
            if (response.status >= 300) {
                throwServerError(response, result, "Response not successful: Received status code ".concat(response.status));
            }
            if (!Array.isArray(result) &&
                !hasOwnProperty$4.call(result, 'data') &&
                !hasOwnProperty$4.call(result, 'errors')) {
                throwServerError(response, result, "Server response was missing for query '".concat(Array.isArray(operations)
                    ? operations.map(function (op) { return op.operationName; })
                    : operations.operationName, "'."));
            }
            return result;
        }); };
    }

    var serializeFetchParameter = function (p, label) {
        var serialized;
        try {
            serialized = JSON.stringify(p);
        }
        catch (e) {
            var parseError = __DEV__ ? new InvariantError("Network request failed. ".concat(label, " is not serializable: ").concat(e.message)) : new InvariantError(21);
            parseError.parseError = e;
            throw parseError;
        }
        return serialized;
    };

    var defaultHttpOptions = {
        includeQuery: true,
        includeExtensions: false,
    };
    var defaultHeaders = {
        accept: '*/*',
        'content-type': 'application/json',
    };
    var defaultOptions = {
        method: 'POST',
    };
    var fallbackHttpConfig = {
        http: defaultHttpOptions,
        headers: defaultHeaders,
        options: defaultOptions,
    };
    var defaultPrinter = function (ast, printer) { return printer(ast); };
    function selectHttpOptionsAndBodyInternal(operation, printer) {
        var configs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            configs[_i - 2] = arguments[_i];
        }
        var options = {};
        var http = {};
        configs.forEach(function (config) {
            options = __assign(__assign(__assign({}, options), config.options), { headers: __assign(__assign({}, options.headers), headersToLowerCase(config.headers)) });
            if (config.credentials) {
                options.credentials = config.credentials;
            }
            http = __assign(__assign({}, http), config.http);
        });
        var operationName = operation.operationName, extensions = operation.extensions, variables = operation.variables, query = operation.query;
        var body = { operationName: operationName, variables: variables };
        if (http.includeExtensions)
            body.extensions = extensions;
        if (http.includeQuery)
            body.query = printer(query, print);
        return {
            options: options,
            body: body,
        };
    }
    function headersToLowerCase(headers) {
        if (headers) {
            var normalized_1 = Object.create(null);
            Object.keys(Object(headers)).forEach(function (name) {
                normalized_1[name.toLowerCase()] = headers[name];
            });
            return normalized_1;
        }
        return headers;
    }

    var checkFetcher = function (fetcher) {
        if (!fetcher && typeof fetch === 'undefined') {
            throw __DEV__ ? new InvariantError("\n\"fetch\" has not been found globally and no fetcher has been configured. To fix this, install a fetch package (like https://www.npmjs.com/package/cross-fetch), instantiate the fetcher, and pass it into your HttpLink constructor. For example:\n\nimport fetch from 'cross-fetch';\nimport { ApolloClient, HttpLink } from '@apollo/client';\nconst client = new ApolloClient({\n  link: new HttpLink({ uri: '/graphql', fetch })\n});\n    ") : new InvariantError(20);
        }
    };

    var createSignalIfSupported = function () {
        if (typeof AbortController === 'undefined')
            return { controller: false, signal: false };
        var controller = new AbortController();
        var signal = controller.signal;
        return { controller: controller, signal: signal };
    };

    var selectURI = function (operation, fallbackURI) {
        var context = operation.getContext();
        var contextURI = context.uri;
        if (contextURI) {
            return contextURI;
        }
        else if (typeof fallbackURI === 'function') {
            return fallbackURI(operation);
        }
        else {
            return fallbackURI || '/graphql';
        }
    };

    function rewriteURIForGET(chosenURI, body) {
        var queryParams = [];
        var addQueryParam = function (key, value) {
            queryParams.push("".concat(key, "=").concat(encodeURIComponent(value)));
        };
        if ('query' in body) {
            addQueryParam('query', body.query);
        }
        if (body.operationName) {
            addQueryParam('operationName', body.operationName);
        }
        if (body.variables) {
            var serializedVariables = void 0;
            try {
                serializedVariables = serializeFetchParameter(body.variables, 'Variables map');
            }
            catch (parseError) {
                return { parseError: parseError };
            }
            addQueryParam('variables', serializedVariables);
        }
        if (body.extensions) {
            var serializedExtensions = void 0;
            try {
                serializedExtensions = serializeFetchParameter(body.extensions, 'Extensions map');
            }
            catch (parseError) {
                return { parseError: parseError };
            }
            addQueryParam('extensions', serializedExtensions);
        }
        var fragment = '', preFragment = chosenURI;
        var fragmentStart = chosenURI.indexOf('#');
        if (fragmentStart !== -1) {
            fragment = chosenURI.substr(fragmentStart);
            preFragment = chosenURI.substr(0, fragmentStart);
        }
        var queryParamsPrefix = preFragment.indexOf('?') === -1 ? '?' : '&';
        var newURI = preFragment + queryParamsPrefix + queryParams.join('&') + fragment;
        return { newURI: newURI };
    }

    var backupFetch = maybe$1(function () { return fetch; });
    var createHttpLink = function (linkOptions) {
        if (linkOptions === void 0) { linkOptions = {}; }
        var _a = linkOptions.uri, uri = _a === void 0 ? '/graphql' : _a, preferredFetch = linkOptions.fetch, _b = linkOptions.print, print = _b === void 0 ? defaultPrinter : _b, includeExtensions = linkOptions.includeExtensions, useGETForQueries = linkOptions.useGETForQueries, _c = linkOptions.includeUnusedVariables, includeUnusedVariables = _c === void 0 ? false : _c, requestOptions = __rest(linkOptions, ["uri", "fetch", "print", "includeExtensions", "useGETForQueries", "includeUnusedVariables"]);
        if (__DEV__) {
            checkFetcher(preferredFetch || backupFetch);
        }
        var linkConfig = {
            http: { includeExtensions: includeExtensions },
            options: requestOptions.fetchOptions,
            credentials: requestOptions.credentials,
            headers: requestOptions.headers,
        };
        return new ApolloLink(function (operation) {
            var chosenURI = selectURI(operation, uri);
            var context = operation.getContext();
            var clientAwarenessHeaders = {};
            if (context.clientAwareness) {
                var _a = context.clientAwareness, name_1 = _a.name, version = _a.version;
                if (name_1) {
                    clientAwarenessHeaders['apollographql-client-name'] = name_1;
                }
                if (version) {
                    clientAwarenessHeaders['apollographql-client-version'] = version;
                }
            }
            var contextHeaders = __assign(__assign({}, clientAwarenessHeaders), context.headers);
            var contextConfig = {
                http: context.http,
                options: context.fetchOptions,
                credentials: context.credentials,
                headers: contextHeaders,
            };
            var _b = selectHttpOptionsAndBodyInternal(operation, print, fallbackHttpConfig, linkConfig, contextConfig), options = _b.options, body = _b.body;
            if (body.variables && !includeUnusedVariables) {
                var unusedNames_1 = new Set(Object.keys(body.variables));
                visit(operation.query, {
                    Variable: function (node, _key, parent) {
                        if (parent && parent.kind !== 'VariableDefinition') {
                            unusedNames_1.delete(node.name.value);
                        }
                    },
                });
                if (unusedNames_1.size) {
                    body.variables = __assign({}, body.variables);
                    unusedNames_1.forEach(function (name) {
                        delete body.variables[name];
                    });
                }
            }
            var controller;
            if (!options.signal) {
                var _c = createSignalIfSupported(), _controller = _c.controller, signal = _c.signal;
                controller = _controller;
                if (controller)
                    options.signal = signal;
            }
            var definitionIsMutation = function (d) {
                return d.kind === 'OperationDefinition' && d.operation === 'mutation';
            };
            if (useGETForQueries &&
                !operation.query.definitions.some(definitionIsMutation)) {
                options.method = 'GET';
            }
            if (options.method === 'GET') {
                var _d = rewriteURIForGET(chosenURI, body), newURI = _d.newURI, parseError = _d.parseError;
                if (parseError) {
                    return fromError(parseError);
                }
                chosenURI = newURI;
            }
            else {
                try {
                    options.body = serializeFetchParameter(body, 'Payload');
                }
                catch (parseError) {
                    return fromError(parseError);
                }
            }
            return new Observable(function (observer) {
                var currentFetch = preferredFetch || maybe$1(function () { return fetch; }) || backupFetch;
                currentFetch(chosenURI, options)
                    .then(function (response) {
                    operation.setContext({ response: response });
                    return response;
                })
                    .then(parseAndCheckHttpResponse(operation))
                    .then(function (result) {
                    observer.next(result);
                    observer.complete();
                    return result;
                })
                    .catch(function (err) {
                    if (err.name === 'AbortError')
                        return;
                    if (err.result && err.result.errors && err.result.data) {
                        observer.next(err.result);
                    }
                    observer.error(err);
                });
                return function () {
                    if (controller)
                        controller.abort();
                };
            });
        });
    };

    var HttpLink = (function (_super) {
        __extends(HttpLink, _super);
        function HttpLink(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, createHttpLink(options).request) || this;
            _this.options = options;
            return _this;
        }
        return HttpLink;
    }(ApolloLink));

    var _a$2 = Object.prototype, toString = _a$2.toString, hasOwnProperty$3 = _a$2.hasOwnProperty;
    var fnToStr = Function.prototype.toString;
    var previousComparisons = new Map();
    /**
     * Performs a deep equality check on two JavaScript values, tolerating cycles.
     */
    function equal(a, b) {
        try {
            return check(a, b);
        }
        finally {
            previousComparisons.clear();
        }
    }
    function check(a, b) {
        // If the two values are strictly equal, our job is easy.
        if (a === b) {
            return true;
        }
        // Object.prototype.toString returns a representation of the runtime type of
        // the given value that is considerably more precise than typeof.
        var aTag = toString.call(a);
        var bTag = toString.call(b);
        // If the runtime types of a and b are different, they could maybe be equal
        // under some interpretation of equality, but for simplicity and performance
        // we just return false instead.
        if (aTag !== bTag) {
            return false;
        }
        switch (aTag) {
            case '[object Array]':
                // Arrays are a lot like other objects, but we can cheaply compare their
                // lengths as a short-cut before comparing their elements.
                if (a.length !== b.length)
                    return false;
            // Fall through to object case...
            case '[object Object]': {
                if (previouslyCompared(a, b))
                    return true;
                var aKeys = definedKeys(a);
                var bKeys = definedKeys(b);
                // If `a` and `b` have a different number of enumerable keys, they
                // must be different.
                var keyCount = aKeys.length;
                if (keyCount !== bKeys.length)
                    return false;
                // Now make sure they have the same keys.
                for (var k = 0; k < keyCount; ++k) {
                    if (!hasOwnProperty$3.call(b, aKeys[k])) {
                        return false;
                    }
                }
                // Finally, check deep equality of all child properties.
                for (var k = 0; k < keyCount; ++k) {
                    var key = aKeys[k];
                    if (!check(a[key], b[key])) {
                        return false;
                    }
                }
                return true;
            }
            case '[object Error]':
                return a.name === b.name && a.message === b.message;
            case '[object Number]':
                // Handle NaN, which is !== itself.
                if (a !== a)
                    return b !== b;
            // Fall through to shared +a === +b case...
            case '[object Boolean]':
            case '[object Date]':
                return +a === +b;
            case '[object RegExp]':
            case '[object String]':
                return a == "" + b;
            case '[object Map]':
            case '[object Set]': {
                if (a.size !== b.size)
                    return false;
                if (previouslyCompared(a, b))
                    return true;
                var aIterator = a.entries();
                var isMap = aTag === '[object Map]';
                while (true) {
                    var info = aIterator.next();
                    if (info.done)
                        break;
                    // If a instanceof Set, aValue === aKey.
                    var _a = info.value, aKey = _a[0], aValue = _a[1];
                    // So this works the same way for both Set and Map.
                    if (!b.has(aKey)) {
                        return false;
                    }
                    // However, we care about deep equality of values only when dealing
                    // with Map structures.
                    if (isMap && !check(aValue, b.get(aKey))) {
                        return false;
                    }
                }
                return true;
            }
            case '[object Uint16Array]':
            case '[object Uint8Array]': // Buffer, in Node.js.
            case '[object Uint32Array]':
            case '[object Int32Array]':
            case '[object Int8Array]':
            case '[object Int16Array]':
            case '[object ArrayBuffer]':
                // DataView doesn't need these conversions, but the equality check is
                // otherwise the same.
                a = new Uint8Array(a);
                b = new Uint8Array(b);
            // Fall through...
            case '[object DataView]': {
                var len = a.byteLength;
                if (len === b.byteLength) {
                    while (len-- && a[len] === b[len]) {
                        // Keep looping as long as the bytes are equal.
                    }
                }
                return len === -1;
            }
            case '[object AsyncFunction]':
            case '[object GeneratorFunction]':
            case '[object AsyncGeneratorFunction]':
            case '[object Function]': {
                var aCode = fnToStr.call(a);
                if (aCode !== fnToStr.call(b)) {
                    return false;
                }
                // We consider non-native functions equal if they have the same code
                // (native functions require === because their code is censored).
                // Note that this behavior is not entirely sound, since !== function
                // objects with the same code can behave differently depending on
                // their closure scope. However, any function can behave differently
                // depending on the values of its input arguments (including this)
                // and its calling context (including its closure scope), even
                // though the function object is === to itself; and it is entirely
                // possible for functions that are not === to behave exactly the
                // same under all conceivable circumstances. Because none of these
                // factors are statically decidable in JavaScript, JS function
                // equality is not well-defined. This ambiguity allows us to
                // consider the best possible heuristic among various imperfect
                // options, and equating non-native functions that have the same
                // code has enormous practical benefits, such as when comparing
                // functions that are repeatedly passed as fresh function
                // expressions within objects that are otherwise deeply equal. Since
                // any function created from the same syntactic expression (in the
                // same code location) will always stringify to the same code
                // according to fnToStr.call, we can reasonably expect these
                // repeatedly passed function expressions to have the same code, and
                // thus behave "the same" (with all the caveats mentioned above),
                // even though the runtime function objects are !== to one another.
                return !endsWith(aCode, nativeCodeSuffix);
            }
        }
        // Otherwise the values are not equal.
        return false;
    }
    function definedKeys(obj) {
        // Remember that the second argument to Array.prototype.filter will be
        // used as `this` within the callback function.
        return Object.keys(obj).filter(isDefinedKey, obj);
    }
    function isDefinedKey(key) {
        return this[key] !== void 0;
    }
    var nativeCodeSuffix = "{ [native code] }";
    function endsWith(full, suffix) {
        var fromIndex = full.length - suffix.length;
        return fromIndex >= 0 &&
            full.indexOf(suffix, fromIndex) === fromIndex;
    }
    function previouslyCompared(a, b) {
        // Though cyclic references can make an object graph appear infinite from the
        // perspective of a depth-first traversal, the graph still contains a finite
        // number of distinct object references. We use the previousComparisons cache
        // to avoid comparing the same pair of object references more than once, which
        // guarantees termination (even if we end up comparing every object in one
        // graph to every object in the other graph, which is extremely unlikely),
        // while still allowing weird isomorphic structures (like rings with different
        // lengths) a chance to pass the equality test.
        var bSet = previousComparisons.get(a);
        if (bSet) {
            // Return true here because we can be sure false will be returned somewhere
            // else if the objects are not equivalent.
            if (bSet.has(b))
                return true;
        }
        else {
            previousComparisons.set(a, bSet = new Set);
        }
        bSet.add(b);
        return false;
    }

    // A [trie](https://en.wikipedia.org/wiki/Trie) data structure that holds
    // object keys weakly, yet can also hold non-object keys, unlike the
    // native `WeakMap`.
    // If no makeData function is supplied, the looked-up data will be an empty,
    // null-prototype Object.
    var defaultMakeData = function () { return Object.create(null); };
    // Useful for processing arguments objects as well as arrays.
    var _a$1 = Array.prototype, forEach = _a$1.forEach, slice = _a$1.slice;
    var Trie = /** @class */ (function () {
        function Trie(weakness, makeData) {
            if (weakness === void 0) { weakness = true; }
            if (makeData === void 0) { makeData = defaultMakeData; }
            this.weakness = weakness;
            this.makeData = makeData;
        }
        Trie.prototype.lookup = function () {
            var array = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                array[_i] = arguments[_i];
            }
            return this.lookupArray(array);
        };
        Trie.prototype.lookupArray = function (array) {
            var node = this;
            forEach.call(array, function (key) { return node = node.getChildTrie(key); });
            return node.data || (node.data = this.makeData(slice.call(array)));
        };
        Trie.prototype.getChildTrie = function (key) {
            var map = this.weakness && isObjRef(key)
                ? this.weak || (this.weak = new WeakMap())
                : this.strong || (this.strong = new Map());
            var child = map.get(key);
            if (!child)
                map.set(key, child = new Trie(this.weakness, this.makeData));
            return child;
        };
        return Trie;
    }());
    function isObjRef(value) {
        switch (typeof value) {
            case "object":
                if (value === null)
                    break;
            // Fall through to return true...
            case "function":
                return true;
        }
        return false;
    }

    // This currentContext variable will only be used if the makeSlotClass
    // function is called, which happens only if this is the first copy of the
    // @wry/context package to be imported.
    var currentContext = null;
    // This unique internal object is used to denote the absence of a value
    // for a given Slot, and is never exposed to outside code.
    var MISSING_VALUE = {};
    var idCounter = 1;
    // Although we can't do anything about the cost of duplicated code from
    // accidentally bundling multiple copies of the @wry/context package, we can
    // avoid creating the Slot class more than once using makeSlotClass.
    var makeSlotClass = function () { return /** @class */ (function () {
        function Slot() {
            // If you have a Slot object, you can find out its slot.id, but you cannot
            // guess the slot.id of a Slot you don't have access to, thanks to the
            // randomized suffix.
            this.id = [
                "slot",
                idCounter++,
                Date.now(),
                Math.random().toString(36).slice(2),
            ].join(":");
        }
        Slot.prototype.hasValue = function () {
            for (var context_1 = currentContext; context_1; context_1 = context_1.parent) {
                // We use the Slot object iself as a key to its value, which means the
                // value cannot be obtained without a reference to the Slot object.
                if (this.id in context_1.slots) {
                    var value = context_1.slots[this.id];
                    if (value === MISSING_VALUE)
                        break;
                    if (context_1 !== currentContext) {
                        // Cache the value in currentContext.slots so the next lookup will
                        // be faster. This caching is safe because the tree of contexts and
                        // the values of the slots are logically immutable.
                        currentContext.slots[this.id] = value;
                    }
                    return true;
                }
            }
            if (currentContext) {
                // If a value was not found for this Slot, it's never going to be found
                // no matter how many times we look it up, so we might as well cache
                // the absence of the value, too.
                currentContext.slots[this.id] = MISSING_VALUE;
            }
            return false;
        };
        Slot.prototype.getValue = function () {
            if (this.hasValue()) {
                return currentContext.slots[this.id];
            }
        };
        Slot.prototype.withValue = function (value, callback, 
        // Given the prevalence of arrow functions, specifying arguments is likely
        // to be much more common than specifying `this`, hence this ordering:
        args, thisArg) {
            var _a;
            var slots = (_a = {
                    __proto__: null
                },
                _a[this.id] = value,
                _a);
            var parent = currentContext;
            currentContext = { parent: parent, slots: slots };
            try {
                // Function.prototype.apply allows the arguments array argument to be
                // omitted or undefined, so args! is fine here.
                return callback.apply(thisArg, args);
            }
            finally {
                currentContext = parent;
            }
        };
        // Capture the current context and wrap a callback function so that it
        // reestablishes the captured context when called.
        Slot.bind = function (callback) {
            var context = currentContext;
            return function () {
                var saved = currentContext;
                try {
                    currentContext = context;
                    return callback.apply(this, arguments);
                }
                finally {
                    currentContext = saved;
                }
            };
        };
        // Immediately run a callback function without any captured context.
        Slot.noContext = function (callback, 
        // Given the prevalence of arrow functions, specifying arguments is likely
        // to be much more common than specifying `this`, hence this ordering:
        args, thisArg) {
            if (currentContext) {
                var saved = currentContext;
                try {
                    currentContext = null;
                    // Function.prototype.apply allows the arguments array argument to be
                    // omitted or undefined, so args! is fine here.
                    return callback.apply(thisArg, args);
                }
                finally {
                    currentContext = saved;
                }
            }
            else {
                return callback.apply(thisArg, args);
            }
        };
        return Slot;
    }()); };
    // We store a single global implementation of the Slot class as a permanent
    // non-enumerable symbol property of the Array constructor. This obfuscation
    // does nothing to prevent access to the Slot class, but at least it ensures
    // the implementation (i.e. currentContext) cannot be tampered with, and all
    // copies of the @wry/context package (hopefully just one) will share the
    // same Slot implementation. Since the first copy of the @wry/context package
    // to be imported wins, this technique imposes a very high cost for any
    // future breaking changes to the Slot class.
    var globalKey = "@wry/context:Slot";
    var host = Array;
    var Slot = host[globalKey] || function () {
        var Slot = makeSlotClass();
        try {
            Object.defineProperty(host, globalKey, {
                value: host[globalKey] = Slot,
                enumerable: false,
                writable: false,
                configurable: false,
            });
        }
        finally {
            return Slot;
        }
    }();

    Slot.bind; Slot.noContext;

    function defaultDispose() { }
    var Cache = /** @class */ (function () {
        function Cache(max, dispose) {
            if (max === void 0) { max = Infinity; }
            if (dispose === void 0) { dispose = defaultDispose; }
            this.max = max;
            this.dispose = dispose;
            this.map = new Map();
            this.newest = null;
            this.oldest = null;
        }
        Cache.prototype.has = function (key) {
            return this.map.has(key);
        };
        Cache.prototype.get = function (key) {
            var node = this.getNode(key);
            return node && node.value;
        };
        Cache.prototype.getNode = function (key) {
            var node = this.map.get(key);
            if (node && node !== this.newest) {
                var older = node.older, newer = node.newer;
                if (newer) {
                    newer.older = older;
                }
                if (older) {
                    older.newer = newer;
                }
                node.older = this.newest;
                node.older.newer = node;
                node.newer = null;
                this.newest = node;
                if (node === this.oldest) {
                    this.oldest = newer;
                }
            }
            return node;
        };
        Cache.prototype.set = function (key, value) {
            var node = this.getNode(key);
            if (node) {
                return node.value = value;
            }
            node = {
                key: key,
                value: value,
                newer: null,
                older: this.newest
            };
            if (this.newest) {
                this.newest.newer = node;
            }
            this.newest = node;
            this.oldest = this.oldest || node;
            this.map.set(key, node);
            return node.value;
        };
        Cache.prototype.clean = function () {
            while (this.oldest && this.map.size > this.max) {
                this.delete(this.oldest.key);
            }
        };
        Cache.prototype.delete = function (key) {
            var node = this.map.get(key);
            if (node) {
                if (node === this.newest) {
                    this.newest = node.older;
                }
                if (node === this.oldest) {
                    this.oldest = node.newer;
                }
                if (node.newer) {
                    node.newer.older = node.older;
                }
                if (node.older) {
                    node.older.newer = node.newer;
                }
                this.map.delete(key);
                this.dispose(node.value, key);
                return true;
            }
            return false;
        };
        return Cache;
    }());

    var parentEntrySlot = new Slot();

    var _a;
    var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
    var 
    // This Array.from polyfill is restricted to working with Set<any> for now,
    // but we can improve the polyfill and add other input types, as needed. Note
    // that this fallback implementation will only be used if the host environment
    // does not support a native Array.from function. In most modern JS runtimes,
    // the toArray function exported here will be === Array.from.
    toArray = (_a = Array.from, _a === void 0 ? function (collection) {
        var array = [];
        collection.forEach(function (item) { return array.push(item); });
        return array;
    } : _a);
    function maybeUnsubscribe(entryOrDep) {
        var unsubscribe = entryOrDep.unsubscribe;
        if (typeof unsubscribe === "function") {
            entryOrDep.unsubscribe = void 0;
            unsubscribe();
        }
    }

    var emptySetPool = [];
    var POOL_TARGET_SIZE = 100;
    // Since this package might be used browsers, we should avoid using the
    // Node built-in assert module.
    function assert(condition, optionalMessage) {
        if (!condition) {
            throw new Error(optionalMessage || "assertion failure");
        }
    }
    function valueIs(a, b) {
        var len = a.length;
        return (
        // Unknown values are not equal to each other.
        len > 0 &&
            // Both values must be ordinary (or both exceptional) to be equal.
            len === b.length &&
            // The underlying value or exception must be the same.
            a[len - 1] === b[len - 1]);
    }
    function valueGet(value) {
        switch (value.length) {
            case 0: throw new Error("unknown value");
            case 1: return value[0];
            case 2: throw value[1];
        }
    }
    function valueCopy(value) {
        return value.slice(0);
    }
    var Entry = /** @class */ (function () {
        function Entry(fn) {
            this.fn = fn;
            this.parents = new Set();
            this.childValues = new Map();
            // When this Entry has children that are dirty, this property becomes
            // a Set containing other Entry objects, borrowed from emptySetPool.
            // When the set becomes empty, it gets recycled back to emptySetPool.
            this.dirtyChildren = null;
            this.dirty = true;
            this.recomputing = false;
            this.value = [];
            this.deps = null;
            ++Entry.count;
        }
        Entry.prototype.peek = function () {
            if (this.value.length === 1 && !mightBeDirty(this)) {
                rememberParent(this);
                return this.value[0];
            }
        };
        // This is the most important method of the Entry API, because it
        // determines whether the cached this.value can be returned immediately,
        // or must be recomputed. The overall performance of the caching system
        // depends on the truth of the following observations: (1) this.dirty is
        // usually false, (2) this.dirtyChildren is usually null/empty, and thus
        // (3) valueGet(this.value) is usually returned without recomputation.
        Entry.prototype.recompute = function (args) {
            assert(!this.recomputing, "already recomputing");
            rememberParent(this);
            return mightBeDirty(this)
                ? reallyRecompute(this, args)
                : valueGet(this.value);
        };
        Entry.prototype.setDirty = function () {
            if (this.dirty)
                return;
            this.dirty = true;
            this.value.length = 0;
            reportDirty(this);
            // We can go ahead and unsubscribe here, since any further dirty
            // notifications we receive will be redundant, and unsubscribing may
            // free up some resources, e.g. file watchers.
            maybeUnsubscribe(this);
        };
        Entry.prototype.dispose = function () {
            var _this = this;
            this.setDirty();
            // Sever any dependency relationships with our own children, so those
            // children don't retain this parent Entry in their child.parents sets,
            // thereby preventing it from being fully garbage collected.
            forgetChildren(this);
            // Because this entry has been kicked out of the cache (in index.js),
            // we've lost the ability to find out if/when this entry becomes dirty,
            // whether that happens through a subscription, because of a direct call
            // to entry.setDirty(), or because one of its children becomes dirty.
            // Because of this loss of future information, we have to assume the
            // worst (that this entry might have become dirty very soon), so we must
            // immediately mark this entry's parents as dirty. Normally we could
            // just call entry.setDirty() rather than calling parent.setDirty() for
            // each parent, but that would leave this entry in parent.childValues
            // and parent.dirtyChildren, which would prevent the child from being
            // truly forgotten.
            eachParent(this, function (parent, child) {
                parent.setDirty();
                forgetChild(parent, _this);
            });
        };
        Entry.prototype.forget = function () {
            // The code that creates Entry objects in index.ts will replace this method
            // with one that actually removes the Entry from the cache, which will also
            // trigger the entry.dispose method.
            this.dispose();
        };
        Entry.prototype.dependOn = function (dep) {
            dep.add(this);
            if (!this.deps) {
                this.deps = emptySetPool.pop() || new Set();
            }
            this.deps.add(dep);
        };
        Entry.prototype.forgetDeps = function () {
            var _this = this;
            if (this.deps) {
                toArray(this.deps).forEach(function (dep) { return dep.delete(_this); });
                this.deps.clear();
                emptySetPool.push(this.deps);
                this.deps = null;
            }
        };
        Entry.count = 0;
        return Entry;
    }());
    function rememberParent(child) {
        var parent = parentEntrySlot.getValue();
        if (parent) {
            child.parents.add(parent);
            if (!parent.childValues.has(child)) {
                parent.childValues.set(child, []);
            }
            if (mightBeDirty(child)) {
                reportDirtyChild(parent, child);
            }
            else {
                reportCleanChild(parent, child);
            }
            return parent;
        }
    }
    function reallyRecompute(entry, args) {
        forgetChildren(entry);
        // Set entry as the parent entry while calling recomputeNewValue(entry).
        parentEntrySlot.withValue(entry, recomputeNewValue, [entry, args]);
        if (maybeSubscribe(entry, args)) {
            // If we successfully recomputed entry.value and did not fail to
            // (re)subscribe, then this Entry is no longer explicitly dirty.
            setClean(entry);
        }
        return valueGet(entry.value);
    }
    function recomputeNewValue(entry, args) {
        entry.recomputing = true;
        // Set entry.value as unknown.
        entry.value.length = 0;
        try {
            // If entry.fn succeeds, entry.value will become a normal Value.
            entry.value[0] = entry.fn.apply(null, args);
        }
        catch (e) {
            // If entry.fn throws, entry.value will become exceptional.
            entry.value[1] = e;
        }
        // Either way, this line is always reached.
        entry.recomputing = false;
    }
    function mightBeDirty(entry) {
        return entry.dirty || !!(entry.dirtyChildren && entry.dirtyChildren.size);
    }
    function setClean(entry) {
        entry.dirty = false;
        if (mightBeDirty(entry)) {
            // This Entry may still have dirty children, in which case we can't
            // let our parents know we're clean just yet.
            return;
        }
        reportClean(entry);
    }
    function reportDirty(child) {
        eachParent(child, reportDirtyChild);
    }
    function reportClean(child) {
        eachParent(child, reportCleanChild);
    }
    function eachParent(child, callback) {
        var parentCount = child.parents.size;
        if (parentCount) {
            var parents = toArray(child.parents);
            for (var i = 0; i < parentCount; ++i) {
                callback(parents[i], child);
            }
        }
    }
    // Let a parent Entry know that one of its children may be dirty.
    function reportDirtyChild(parent, child) {
        // Must have called rememberParent(child) before calling
        // reportDirtyChild(parent, child).
        assert(parent.childValues.has(child));
        assert(mightBeDirty(child));
        var parentWasClean = !mightBeDirty(parent);
        if (!parent.dirtyChildren) {
            parent.dirtyChildren = emptySetPool.pop() || new Set;
        }
        else if (parent.dirtyChildren.has(child)) {
            // If we already know this child is dirty, then we must have already
            // informed our own parents that we are dirty, so we can terminate
            // the recursion early.
            return;
        }
        parent.dirtyChildren.add(child);
        // If parent was clean before, it just became (possibly) dirty (according to
        // mightBeDirty), since we just added child to parent.dirtyChildren.
        if (parentWasClean) {
            reportDirty(parent);
        }
    }
    // Let a parent Entry know that one of its children is no longer dirty.
    function reportCleanChild(parent, child) {
        // Must have called rememberChild(child) before calling
        // reportCleanChild(parent, child).
        assert(parent.childValues.has(child));
        assert(!mightBeDirty(child));
        var childValue = parent.childValues.get(child);
        if (childValue.length === 0) {
            parent.childValues.set(child, valueCopy(child.value));
        }
        else if (!valueIs(childValue, child.value)) {
            parent.setDirty();
        }
        removeDirtyChild(parent, child);
        if (mightBeDirty(parent)) {
            return;
        }
        reportClean(parent);
    }
    function removeDirtyChild(parent, child) {
        var dc = parent.dirtyChildren;
        if (dc) {
            dc.delete(child);
            if (dc.size === 0) {
                if (emptySetPool.length < POOL_TARGET_SIZE) {
                    emptySetPool.push(dc);
                }
                parent.dirtyChildren = null;
            }
        }
    }
    // Removes all children from this entry and returns an array of the
    // removed children.
    function forgetChildren(parent) {
        if (parent.childValues.size > 0) {
            parent.childValues.forEach(function (_value, child) {
                forgetChild(parent, child);
            });
        }
        // Remove this parent Entry from any sets to which it was added by the
        // addToSet method.
        parent.forgetDeps();
        // After we forget all our children, this.dirtyChildren must be empty
        // and therefore must have been reset to null.
        assert(parent.dirtyChildren === null);
    }
    function forgetChild(parent, child) {
        child.parents.delete(parent);
        parent.childValues.delete(child);
        removeDirtyChild(parent, child);
    }
    function maybeSubscribe(entry, args) {
        if (typeof entry.subscribe === "function") {
            try {
                maybeUnsubscribe(entry); // Prevent double subscriptions.
                entry.unsubscribe = entry.subscribe.apply(null, args);
            }
            catch (e) {
                // If this Entry has a subscribe function and it threw an exception
                // (or an unsubscribe function it previously returned now throws),
                // return false to indicate that we were not able to subscribe (or
                // unsubscribe), and this Entry should remain dirty.
                entry.setDirty();
                return false;
            }
        }
        // Returning true indicates either that there was no entry.subscribe
        // function or that it succeeded.
        return true;
    }

    var EntryMethods = {
        setDirty: true,
        dispose: true,
        forget: true,
    };
    function dep(options) {
        var depsByKey = new Map();
        var subscribe = options && options.subscribe;
        function depend(key) {
            var parent = parentEntrySlot.getValue();
            if (parent) {
                var dep_1 = depsByKey.get(key);
                if (!dep_1) {
                    depsByKey.set(key, dep_1 = new Set);
                }
                parent.dependOn(dep_1);
                if (typeof subscribe === "function") {
                    maybeUnsubscribe(dep_1);
                    dep_1.unsubscribe = subscribe(key);
                }
            }
        }
        depend.dirty = function dirty(key, entryMethodName) {
            var dep = depsByKey.get(key);
            if (dep) {
                var m_1 = (entryMethodName &&
                    hasOwnProperty$2.call(EntryMethods, entryMethodName)) ? entryMethodName : "setDirty";
                // We have to use toArray(dep).forEach instead of dep.forEach, because
                // modifying a Set while iterating over it can cause elements in the Set
                // to be removed from the Set before they've been iterated over.
                toArray(dep).forEach(function (entry) { return entry[m_1](); });
                depsByKey.delete(key);
                maybeUnsubscribe(dep);
            }
        };
        return depend;
    }

    function makeDefaultMakeCacheKeyFunction() {
        var keyTrie = new Trie(typeof WeakMap === "function");
        return function () {
            return keyTrie.lookupArray(arguments);
        };
    }
    // The defaultMakeCacheKey function is remarkably powerful, because it gives
    // a unique object for any shallow-identical list of arguments. If you need
    // to implement a custom makeCacheKey function, you may find it helpful to
    // delegate the final work to defaultMakeCacheKey, which is why we export it
    // here. However, you may want to avoid defaultMakeCacheKey if your runtime
    // does not support WeakMap, or you have the ability to return a string key.
    // In those cases, just write your own custom makeCacheKey functions.
    makeDefaultMakeCacheKeyFunction();
    var caches = new Set();
    function wrap(originalFunction, options) {
        if (options === void 0) { options = Object.create(null); }
        var cache = new Cache(options.max || Math.pow(2, 16), function (entry) { return entry.dispose(); });
        var keyArgs = options.keyArgs;
        var makeCacheKey = options.makeCacheKey ||
            makeDefaultMakeCacheKeyFunction();
        var optimistic = function () {
            var key = makeCacheKey.apply(null, keyArgs ? keyArgs.apply(null, arguments) : arguments);
            if (key === void 0) {
                return originalFunction.apply(null, arguments);
            }
            var entry = cache.get(key);
            if (!entry) {
                cache.set(key, entry = new Entry(originalFunction));
                entry.subscribe = options.subscribe;
                // Give the Entry the ability to trigger cache.delete(key), even though
                // the Entry itself does not know about key or cache.
                entry.forget = function () { return cache.delete(key); };
            }
            var value = entry.recompute(Array.prototype.slice.call(arguments));
            // Move this entry to the front of the least-recently used queue,
            // since we just finished computing its value.
            cache.set(key, entry);
            caches.add(cache);
            // Clean up any excess entries in the cache, but only if there is no
            // active parent entry, meaning we're not in the middle of a larger
            // computation that might be flummoxed by the cleaning.
            if (!parentEntrySlot.hasValue()) {
                caches.forEach(function (cache) { return cache.clean(); });
                caches.clear();
            }
            return value;
        };
        Object.defineProperty(optimistic, "size", {
            get: function () {
                return cache["map"].size;
            },
            configurable: false,
            enumerable: false,
        });
        function dirtyKey(key) {
            var entry = cache.get(key);
            if (entry) {
                entry.setDirty();
            }
        }
        optimistic.dirtyKey = dirtyKey;
        optimistic.dirty = function dirty() {
            dirtyKey(makeCacheKey.apply(null, arguments));
        };
        function peekKey(key) {
            var entry = cache.get(key);
            if (entry) {
                return entry.peek();
            }
        }
        optimistic.peekKey = peekKey;
        optimistic.peek = function peek() {
            return peekKey(makeCacheKey.apply(null, arguments));
        };
        function forgetKey(key) {
            return cache.delete(key);
        }
        optimistic.forgetKey = forgetKey;
        optimistic.forget = function forget() {
            return forgetKey(makeCacheKey.apply(null, arguments));
        };
        optimistic.makeCacheKey = makeCacheKey;
        optimistic.getKey = keyArgs ? function getKey() {
            return makeCacheKey.apply(null, keyArgs.apply(null, arguments));
        } : makeCacheKey;
        return Object.freeze(optimistic);
    }

    var ApolloCache = (function () {
        function ApolloCache() {
            this.getFragmentDoc = wrap(getFragmentQueryDocument);
        }
        ApolloCache.prototype.batch = function (options) {
            var _this = this;
            var optimisticId = typeof options.optimistic === "string" ? options.optimistic :
                options.optimistic === false ? null : void 0;
            var updateResult;
            this.performTransaction(function () { return updateResult = options.update(_this); }, optimisticId);
            return updateResult;
        };
        ApolloCache.prototype.recordOptimisticTransaction = function (transaction, optimisticId) {
            this.performTransaction(transaction, optimisticId);
        };
        ApolloCache.prototype.transformDocument = function (document) {
            return document;
        };
        ApolloCache.prototype.identify = function (object) {
            return;
        };
        ApolloCache.prototype.gc = function () {
            return [];
        };
        ApolloCache.prototype.modify = function (options) {
            return false;
        };
        ApolloCache.prototype.transformForLink = function (document) {
            return document;
        };
        ApolloCache.prototype.readQuery = function (options, optimistic) {
            if (optimistic === void 0) { optimistic = !!options.optimistic; }
            return this.read(__assign(__assign({}, options), { rootId: options.id || 'ROOT_QUERY', optimistic: optimistic }));
        };
        ApolloCache.prototype.readFragment = function (options, optimistic) {
            if (optimistic === void 0) { optimistic = !!options.optimistic; }
            return this.read(__assign(__assign({}, options), { query: this.getFragmentDoc(options.fragment, options.fragmentName), rootId: options.id, optimistic: optimistic }));
        };
        ApolloCache.prototype.writeQuery = function (_a) {
            var id = _a.id, data = _a.data, options = __rest(_a, ["id", "data"]);
            return this.write(Object.assign(options, {
                dataId: id || 'ROOT_QUERY',
                result: data,
            }));
        };
        ApolloCache.prototype.writeFragment = function (_a) {
            var id = _a.id, data = _a.data, fragment = _a.fragment, fragmentName = _a.fragmentName, options = __rest(_a, ["id", "data", "fragment", "fragmentName"]);
            return this.write(Object.assign(options, {
                query: this.getFragmentDoc(fragment, fragmentName),
                dataId: id,
                result: data,
            }));
        };
        ApolloCache.prototype.updateQuery = function (options, update) {
            return this.batch({
                update: function (cache) {
                    var value = cache.readQuery(options);
                    var data = update(value);
                    if (data === void 0 || data === null)
                        return value;
                    cache.writeQuery(__assign(__assign({}, options), { data: data }));
                    return data;
                },
            });
        };
        ApolloCache.prototype.updateFragment = function (options, update) {
            return this.batch({
                update: function (cache) {
                    var value = cache.readFragment(options);
                    var data = update(value);
                    if (data === void 0 || data === null)
                        return value;
                    cache.writeFragment(__assign(__assign({}, options), { data: data }));
                    return data;
                },
            });
        };
        return ApolloCache;
    }());

    var MissingFieldError = (function () {
        function MissingFieldError(message, path, query, variables) {
            this.message = message;
            this.path = path;
            this.query = query;
            this.variables = variables;
        }
        return MissingFieldError;
    }());

    var hasOwn = Object.prototype.hasOwnProperty;
    function defaultDataIdFromObject(_a, context) {
        var __typename = _a.__typename, id = _a.id, _id = _a._id;
        if (typeof __typename === "string") {
            if (context) {
                context.keyObject =
                    id !== void 0 ? { id: id } :
                        _id !== void 0 ? { _id: _id } :
                            void 0;
            }
            if (id === void 0)
                id = _id;
            if (id !== void 0) {
                return "".concat(__typename, ":").concat((typeof id === "number" ||
                    typeof id === "string") ? id : JSON.stringify(id));
            }
        }
    }
    var defaultConfig = {
        dataIdFromObject: defaultDataIdFromObject,
        addTypename: true,
        resultCaching: true,
        canonizeResults: false,
    };
    function normalizeConfig(config) {
        return compact(defaultConfig, config);
    }
    function shouldCanonizeResults(config) {
        var value = config.canonizeResults;
        return value === void 0 ? defaultConfig.canonizeResults : value;
    }
    function getTypenameFromStoreObject(store, objectOrReference) {
        return isReference(objectOrReference)
            ? store.get(objectOrReference.__ref, "__typename")
            : objectOrReference && objectOrReference.__typename;
    }
    var TypeOrFieldNameRegExp = /^[_a-z][_0-9a-z]*/i;
    function fieldNameFromStoreName(storeFieldName) {
        var match = storeFieldName.match(TypeOrFieldNameRegExp);
        return match ? match[0] : storeFieldName;
    }
    function selectionSetMatchesResult(selectionSet, result, variables) {
        if (isNonNullObject(result)) {
            return isArray(result)
                ? result.every(function (item) { return selectionSetMatchesResult(selectionSet, item, variables); })
                : selectionSet.selections.every(function (field) {
                    if (isField(field) && shouldInclude(field, variables)) {
                        var key = resultKeyNameFromField(field);
                        return hasOwn.call(result, key) &&
                            (!field.selectionSet ||
                                selectionSetMatchesResult(field.selectionSet, result[key], variables));
                    }
                    return true;
                });
        }
        return false;
    }
    function storeValueIsStoreObject(value) {
        return isNonNullObject(value) &&
            !isReference(value) &&
            !isArray(value);
    }
    function makeProcessedFieldsMerger() {
        return new DeepMerger;
    }
    var isArray = function (a) { return Array.isArray(a); };

    var DELETE = Object.create(null);
    var delModifier = function () { return DELETE; };
    var INVALIDATE = Object.create(null);
    var EntityStore = (function () {
        function EntityStore(policies, group) {
            var _this = this;
            this.policies = policies;
            this.group = group;
            this.data = Object.create(null);
            this.rootIds = Object.create(null);
            this.refs = Object.create(null);
            this.getFieldValue = function (objectOrReference, storeFieldName) { return maybeDeepFreeze(isReference(objectOrReference)
                ? _this.get(objectOrReference.__ref, storeFieldName)
                : objectOrReference && objectOrReference[storeFieldName]); };
            this.canRead = function (objOrRef) {
                return isReference(objOrRef)
                    ? _this.has(objOrRef.__ref)
                    : typeof objOrRef === "object";
            };
            this.toReference = function (objOrIdOrRef, mergeIntoStore) {
                if (typeof objOrIdOrRef === "string") {
                    return makeReference(objOrIdOrRef);
                }
                if (isReference(objOrIdOrRef)) {
                    return objOrIdOrRef;
                }
                var id = _this.policies.identify(objOrIdOrRef)[0];
                if (id) {
                    var ref = makeReference(id);
                    if (mergeIntoStore) {
                        _this.merge(id, objOrIdOrRef);
                    }
                    return ref;
                }
            };
        }
        EntityStore.prototype.toObject = function () {
            return __assign({}, this.data);
        };
        EntityStore.prototype.has = function (dataId) {
            return this.lookup(dataId, true) !== void 0;
        };
        EntityStore.prototype.get = function (dataId, fieldName) {
            this.group.depend(dataId, fieldName);
            if (hasOwn.call(this.data, dataId)) {
                var storeObject = this.data[dataId];
                if (storeObject && hasOwn.call(storeObject, fieldName)) {
                    return storeObject[fieldName];
                }
            }
            if (fieldName === "__typename" &&
                hasOwn.call(this.policies.rootTypenamesById, dataId)) {
                return this.policies.rootTypenamesById[dataId];
            }
            if (this instanceof Layer) {
                return this.parent.get(dataId, fieldName);
            }
        };
        EntityStore.prototype.lookup = function (dataId, dependOnExistence) {
            if (dependOnExistence)
                this.group.depend(dataId, "__exists");
            if (hasOwn.call(this.data, dataId)) {
                return this.data[dataId];
            }
            if (this instanceof Layer) {
                return this.parent.lookup(dataId, dependOnExistence);
            }
            if (this.policies.rootTypenamesById[dataId]) {
                return Object.create(null);
            }
        };
        EntityStore.prototype.merge = function (older, newer) {
            var _this = this;
            var dataId;
            if (isReference(older))
                older = older.__ref;
            if (isReference(newer))
                newer = newer.__ref;
            var existing = typeof older === "string"
                ? this.lookup(dataId = older)
                : older;
            var incoming = typeof newer === "string"
                ? this.lookup(dataId = newer)
                : newer;
            if (!incoming)
                return;
            __DEV__ ? invariant$1(typeof dataId === "string", "store.merge expects a string ID") : invariant$1(typeof dataId === "string", 1);
            var merged = new DeepMerger(storeObjectReconciler).merge(existing, incoming);
            this.data[dataId] = merged;
            if (merged !== existing) {
                delete this.refs[dataId];
                if (this.group.caching) {
                    var fieldsToDirty_1 = Object.create(null);
                    if (!existing)
                        fieldsToDirty_1.__exists = 1;
                    Object.keys(incoming).forEach(function (storeFieldName) {
                        if (!existing || existing[storeFieldName] !== merged[storeFieldName]) {
                            fieldsToDirty_1[storeFieldName] = 1;
                            var fieldName = fieldNameFromStoreName(storeFieldName);
                            if (fieldName !== storeFieldName &&
                                !_this.policies.hasKeyArgs(merged.__typename, fieldName)) {
                                fieldsToDirty_1[fieldName] = 1;
                            }
                            if (merged[storeFieldName] === void 0 && !(_this instanceof Layer)) {
                                delete merged[storeFieldName];
                            }
                        }
                    });
                    if (fieldsToDirty_1.__typename &&
                        !(existing && existing.__typename) &&
                        this.policies.rootTypenamesById[dataId] === merged.__typename) {
                        delete fieldsToDirty_1.__typename;
                    }
                    Object.keys(fieldsToDirty_1).forEach(function (fieldName) { return _this.group.dirty(dataId, fieldName); });
                }
            }
        };
        EntityStore.prototype.modify = function (dataId, fields) {
            var _this = this;
            var storeObject = this.lookup(dataId);
            if (storeObject) {
                var changedFields_1 = Object.create(null);
                var needToMerge_1 = false;
                var allDeleted_1 = true;
                var sharedDetails_1 = {
                    DELETE: DELETE,
                    INVALIDATE: INVALIDATE,
                    isReference: isReference,
                    toReference: this.toReference,
                    canRead: this.canRead,
                    readField: function (fieldNameOrOptions, from) { return _this.policies.readField(typeof fieldNameOrOptions === "string" ? {
                        fieldName: fieldNameOrOptions,
                        from: from || makeReference(dataId),
                    } : fieldNameOrOptions, { store: _this }); },
                };
                Object.keys(storeObject).forEach(function (storeFieldName) {
                    var fieldName = fieldNameFromStoreName(storeFieldName);
                    var fieldValue = storeObject[storeFieldName];
                    if (fieldValue === void 0)
                        return;
                    var modify = typeof fields === "function"
                        ? fields
                        : fields[storeFieldName] || fields[fieldName];
                    if (modify) {
                        var newValue = modify === delModifier ? DELETE :
                            modify(maybeDeepFreeze(fieldValue), __assign(__assign({}, sharedDetails_1), { fieldName: fieldName, storeFieldName: storeFieldName, storage: _this.getStorage(dataId, storeFieldName) }));
                        if (newValue === INVALIDATE) {
                            _this.group.dirty(dataId, storeFieldName);
                        }
                        else {
                            if (newValue === DELETE)
                                newValue = void 0;
                            if (newValue !== fieldValue) {
                                changedFields_1[storeFieldName] = newValue;
                                needToMerge_1 = true;
                                fieldValue = newValue;
                            }
                        }
                    }
                    if (fieldValue !== void 0) {
                        allDeleted_1 = false;
                    }
                });
                if (needToMerge_1) {
                    this.merge(dataId, changedFields_1);
                    if (allDeleted_1) {
                        if (this instanceof Layer) {
                            this.data[dataId] = void 0;
                        }
                        else {
                            delete this.data[dataId];
                        }
                        this.group.dirty(dataId, "__exists");
                    }
                    return true;
                }
            }
            return false;
        };
        EntityStore.prototype.delete = function (dataId, fieldName, args) {
            var _a;
            var storeObject = this.lookup(dataId);
            if (storeObject) {
                var typename = this.getFieldValue(storeObject, "__typename");
                var storeFieldName = fieldName && args
                    ? this.policies.getStoreFieldName({ typename: typename, fieldName: fieldName, args: args })
                    : fieldName;
                return this.modify(dataId, storeFieldName ? (_a = {},
                    _a[storeFieldName] = delModifier,
                    _a) : delModifier);
            }
            return false;
        };
        EntityStore.prototype.evict = function (options, limit) {
            var evicted = false;
            if (options.id) {
                if (hasOwn.call(this.data, options.id)) {
                    evicted = this.delete(options.id, options.fieldName, options.args);
                }
                if (this instanceof Layer && this !== limit) {
                    evicted = this.parent.evict(options, limit) || evicted;
                }
                if (options.fieldName || evicted) {
                    this.group.dirty(options.id, options.fieldName || "__exists");
                }
            }
            return evicted;
        };
        EntityStore.prototype.clear = function () {
            this.replace(null);
        };
        EntityStore.prototype.extract = function () {
            var _this = this;
            var obj = this.toObject();
            var extraRootIds = [];
            this.getRootIdSet().forEach(function (id) {
                if (!hasOwn.call(_this.policies.rootTypenamesById, id)) {
                    extraRootIds.push(id);
                }
            });
            if (extraRootIds.length) {
                obj.__META = { extraRootIds: extraRootIds.sort() };
            }
            return obj;
        };
        EntityStore.prototype.replace = function (newData) {
            var _this = this;
            Object.keys(this.data).forEach(function (dataId) {
                if (!(newData && hasOwn.call(newData, dataId))) {
                    _this.delete(dataId);
                }
            });
            if (newData) {
                var __META = newData.__META, rest_1 = __rest(newData, ["__META"]);
                Object.keys(rest_1).forEach(function (dataId) {
                    _this.merge(dataId, rest_1[dataId]);
                });
                if (__META) {
                    __META.extraRootIds.forEach(this.retain, this);
                }
            }
        };
        EntityStore.prototype.retain = function (rootId) {
            return this.rootIds[rootId] = (this.rootIds[rootId] || 0) + 1;
        };
        EntityStore.prototype.release = function (rootId) {
            if (this.rootIds[rootId] > 0) {
                var count = --this.rootIds[rootId];
                if (!count)
                    delete this.rootIds[rootId];
                return count;
            }
            return 0;
        };
        EntityStore.prototype.getRootIdSet = function (ids) {
            if (ids === void 0) { ids = new Set(); }
            Object.keys(this.rootIds).forEach(ids.add, ids);
            if (this instanceof Layer) {
                this.parent.getRootIdSet(ids);
            }
            else {
                Object.keys(this.policies.rootTypenamesById).forEach(ids.add, ids);
            }
            return ids;
        };
        EntityStore.prototype.gc = function () {
            var _this = this;
            var ids = this.getRootIdSet();
            var snapshot = this.toObject();
            ids.forEach(function (id) {
                if (hasOwn.call(snapshot, id)) {
                    Object.keys(_this.findChildRefIds(id)).forEach(ids.add, ids);
                    delete snapshot[id];
                }
            });
            var idsToRemove = Object.keys(snapshot);
            if (idsToRemove.length) {
                var root_1 = this;
                while (root_1 instanceof Layer)
                    root_1 = root_1.parent;
                idsToRemove.forEach(function (id) { return root_1.delete(id); });
            }
            return idsToRemove;
        };
        EntityStore.prototype.findChildRefIds = function (dataId) {
            if (!hasOwn.call(this.refs, dataId)) {
                var found_1 = this.refs[dataId] = Object.create(null);
                var root = this.data[dataId];
                if (!root)
                    return found_1;
                var workSet_1 = new Set([root]);
                workSet_1.forEach(function (obj) {
                    if (isReference(obj)) {
                        found_1[obj.__ref] = true;
                    }
                    if (isNonNullObject(obj)) {
                        Object.keys(obj).forEach(function (key) {
                            var child = obj[key];
                            if (isNonNullObject(child)) {
                                workSet_1.add(child);
                            }
                        });
                    }
                });
            }
            return this.refs[dataId];
        };
        EntityStore.prototype.makeCacheKey = function () {
            return this.group.keyMaker.lookupArray(arguments);
        };
        return EntityStore;
    }());
    var CacheGroup = (function () {
        function CacheGroup(caching, parent) {
            if (parent === void 0) { parent = null; }
            this.caching = caching;
            this.parent = parent;
            this.d = null;
            this.resetCaching();
        }
        CacheGroup.prototype.resetCaching = function () {
            this.d = this.caching ? dep() : null;
            this.keyMaker = new Trie(canUseWeakMap);
        };
        CacheGroup.prototype.depend = function (dataId, storeFieldName) {
            if (this.d) {
                this.d(makeDepKey(dataId, storeFieldName));
                var fieldName = fieldNameFromStoreName(storeFieldName);
                if (fieldName !== storeFieldName) {
                    this.d(makeDepKey(dataId, fieldName));
                }
                if (this.parent) {
                    this.parent.depend(dataId, storeFieldName);
                }
            }
        };
        CacheGroup.prototype.dirty = function (dataId, storeFieldName) {
            if (this.d) {
                this.d.dirty(makeDepKey(dataId, storeFieldName), storeFieldName === "__exists" ? "forget" : "setDirty");
            }
        };
        return CacheGroup;
    }());
    function makeDepKey(dataId, storeFieldName) {
        return storeFieldName + '#' + dataId;
    }
    function maybeDependOnExistenceOfEntity(store, entityId) {
        if (supportsResultCaching(store)) {
            store.group.depend(entityId, "__exists");
        }
    }
    (function (EntityStore) {
        var Root = (function (_super) {
            __extends(Root, _super);
            function Root(_a) {
                var policies = _a.policies, _b = _a.resultCaching, resultCaching = _b === void 0 ? true : _b, seed = _a.seed;
                var _this = _super.call(this, policies, new CacheGroup(resultCaching)) || this;
                _this.stump = new Stump(_this);
                _this.storageTrie = new Trie(canUseWeakMap);
                if (seed)
                    _this.replace(seed);
                return _this;
            }
            Root.prototype.addLayer = function (layerId, replay) {
                return this.stump.addLayer(layerId, replay);
            };
            Root.prototype.removeLayer = function () {
                return this;
            };
            Root.prototype.getStorage = function () {
                return this.storageTrie.lookupArray(arguments);
            };
            return Root;
        }(EntityStore));
        EntityStore.Root = Root;
    })(EntityStore || (EntityStore = {}));
    var Layer = (function (_super) {
        __extends(Layer, _super);
        function Layer(id, parent, replay, group) {
            var _this = _super.call(this, parent.policies, group) || this;
            _this.id = id;
            _this.parent = parent;
            _this.replay = replay;
            _this.group = group;
            replay(_this);
            return _this;
        }
        Layer.prototype.addLayer = function (layerId, replay) {
            return new Layer(layerId, this, replay, this.group);
        };
        Layer.prototype.removeLayer = function (layerId) {
            var _this = this;
            var parent = this.parent.removeLayer(layerId);
            if (layerId === this.id) {
                if (this.group.caching) {
                    Object.keys(this.data).forEach(function (dataId) {
                        var ownStoreObject = _this.data[dataId];
                        var parentStoreObject = parent["lookup"](dataId);
                        if (!parentStoreObject) {
                            _this.delete(dataId);
                        }
                        else if (!ownStoreObject) {
                            _this.group.dirty(dataId, "__exists");
                            Object.keys(parentStoreObject).forEach(function (storeFieldName) {
                                _this.group.dirty(dataId, storeFieldName);
                            });
                        }
                        else if (ownStoreObject !== parentStoreObject) {
                            Object.keys(ownStoreObject).forEach(function (storeFieldName) {
                                if (!equal(ownStoreObject[storeFieldName], parentStoreObject[storeFieldName])) {
                                    _this.group.dirty(dataId, storeFieldName);
                                }
                            });
                        }
                    });
                }
                return parent;
            }
            if (parent === this.parent)
                return this;
            return parent.addLayer(this.id, this.replay);
        };
        Layer.prototype.toObject = function () {
            return __assign(__assign({}, this.parent.toObject()), this.data);
        };
        Layer.prototype.findChildRefIds = function (dataId) {
            var fromParent = this.parent.findChildRefIds(dataId);
            return hasOwn.call(this.data, dataId) ? __assign(__assign({}, fromParent), _super.prototype.findChildRefIds.call(this, dataId)) : fromParent;
        };
        Layer.prototype.getStorage = function () {
            var p = this.parent;
            while (p.parent)
                p = p.parent;
            return p.getStorage.apply(p, arguments);
        };
        return Layer;
    }(EntityStore));
    var Stump = (function (_super) {
        __extends(Stump, _super);
        function Stump(root) {
            return _super.call(this, "EntityStore.Stump", root, function () { }, new CacheGroup(root.group.caching, root.group)) || this;
        }
        Stump.prototype.removeLayer = function () {
            return this;
        };
        Stump.prototype.merge = function () {
            return this.parent.merge.apply(this.parent, arguments);
        };
        return Stump;
    }(Layer));
    function storeObjectReconciler(existingObject, incomingObject, property) {
        var existingValue = existingObject[property];
        var incomingValue = incomingObject[property];
        return equal(existingValue, incomingValue) ? existingValue : incomingValue;
    }
    function supportsResultCaching(store) {
        return !!(store instanceof EntityStore && store.group.caching);
    }

    function shallowCopy(value) {
        if (isNonNullObject(value)) {
            return isArray(value)
                ? value.slice(0)
                : __assign({ __proto__: Object.getPrototypeOf(value) }, value);
        }
        return value;
    }
    var ObjectCanon = (function () {
        function ObjectCanon() {
            this.known = new (canUseWeakSet ? WeakSet : Set)();
            this.pool = new Trie(canUseWeakMap);
            this.passes = new WeakMap();
            this.keysByJSON = new Map();
            this.empty = this.admit({});
        }
        ObjectCanon.prototype.isKnown = function (value) {
            return isNonNullObject(value) && this.known.has(value);
        };
        ObjectCanon.prototype.pass = function (value) {
            if (isNonNullObject(value)) {
                var copy = shallowCopy(value);
                this.passes.set(copy, value);
                return copy;
            }
            return value;
        };
        ObjectCanon.prototype.admit = function (value) {
            var _this = this;
            if (isNonNullObject(value)) {
                var original = this.passes.get(value);
                if (original)
                    return original;
                var proto = Object.getPrototypeOf(value);
                switch (proto) {
                    case Array.prototype: {
                        if (this.known.has(value))
                            return value;
                        var array = value.map(this.admit, this);
                        var node = this.pool.lookupArray(array);
                        if (!node.array) {
                            this.known.add(node.array = array);
                            if (__DEV__) {
                                Object.freeze(array);
                            }
                        }
                        return node.array;
                    }
                    case null:
                    case Object.prototype: {
                        if (this.known.has(value))
                            return value;
                        var proto_1 = Object.getPrototypeOf(value);
                        var array_1 = [proto_1];
                        var keys = this.sortedKeys(value);
                        array_1.push(keys.json);
                        var firstValueIndex_1 = array_1.length;
                        keys.sorted.forEach(function (key) {
                            array_1.push(_this.admit(value[key]));
                        });
                        var node = this.pool.lookupArray(array_1);
                        if (!node.object) {
                            var obj_1 = node.object = Object.create(proto_1);
                            this.known.add(obj_1);
                            keys.sorted.forEach(function (key, i) {
                                obj_1[key] = array_1[firstValueIndex_1 + i];
                            });
                            if (__DEV__) {
                                Object.freeze(obj_1);
                            }
                        }
                        return node.object;
                    }
                }
            }
            return value;
        };
        ObjectCanon.prototype.sortedKeys = function (obj) {
            var keys = Object.keys(obj);
            var node = this.pool.lookupArray(keys);
            if (!node.keys) {
                keys.sort();
                var json = JSON.stringify(keys);
                if (!(node.keys = this.keysByJSON.get(json))) {
                    this.keysByJSON.set(json, node.keys = { sorted: keys, json: json });
                }
            }
            return node.keys;
        };
        return ObjectCanon;
    }());
    var canonicalStringify = Object.assign(function (value) {
        if (isNonNullObject(value)) {
            if (stringifyCanon === void 0) {
                resetCanonicalStringify();
            }
            var canonical = stringifyCanon.admit(value);
            var json = stringifyCache.get(canonical);
            if (json === void 0) {
                stringifyCache.set(canonical, json = JSON.stringify(canonical));
            }
            return json;
        }
        return JSON.stringify(value);
    }, {
        reset: resetCanonicalStringify,
    });
    var stringifyCanon;
    var stringifyCache;
    function resetCanonicalStringify() {
        stringifyCanon = new ObjectCanon;
        stringifyCache = new (canUseWeakMap ? WeakMap : Map)();
    }

    function execSelectionSetKeyArgs(options) {
        return [
            options.selectionSet,
            options.objectOrReference,
            options.context,
            options.context.canonizeResults,
        ];
    }
    var StoreReader = (function () {
        function StoreReader(config) {
            var _this = this;
            this.knownResults = new (canUseWeakMap ? WeakMap : Map)();
            this.config = compact(config, {
                addTypename: config.addTypename !== false,
                canonizeResults: shouldCanonizeResults(config),
            });
            this.canon = config.canon || new ObjectCanon;
            this.executeSelectionSet = wrap(function (options) {
                var _a;
                var canonizeResults = options.context.canonizeResults;
                var peekArgs = execSelectionSetKeyArgs(options);
                peekArgs[3] = !canonizeResults;
                var other = (_a = _this.executeSelectionSet).peek.apply(_a, peekArgs);
                if (other) {
                    if (canonizeResults) {
                        return __assign(__assign({}, other), { result: _this.canon.admit(other.result) });
                    }
                    return other;
                }
                maybeDependOnExistenceOfEntity(options.context.store, options.enclosingRef.__ref);
                return _this.execSelectionSetImpl(options);
            }, {
                max: this.config.resultCacheMaxSize,
                keyArgs: execSelectionSetKeyArgs,
                makeCacheKey: function (selectionSet, parent, context, canonizeResults) {
                    if (supportsResultCaching(context.store)) {
                        return context.store.makeCacheKey(selectionSet, isReference(parent) ? parent.__ref : parent, context.varString, canonizeResults);
                    }
                }
            });
            this.executeSubSelectedArray = wrap(function (options) {
                maybeDependOnExistenceOfEntity(options.context.store, options.enclosingRef.__ref);
                return _this.execSubSelectedArrayImpl(options);
            }, {
                max: this.config.resultCacheMaxSize,
                makeCacheKey: function (_a) {
                    var field = _a.field, array = _a.array, context = _a.context;
                    if (supportsResultCaching(context.store)) {
                        return context.store.makeCacheKey(field, array, context.varString);
                    }
                }
            });
        }
        StoreReader.prototype.resetCanon = function () {
            this.canon = new ObjectCanon;
        };
        StoreReader.prototype.diffQueryAgainstStore = function (_a) {
            var store = _a.store, query = _a.query, _b = _a.rootId, rootId = _b === void 0 ? 'ROOT_QUERY' : _b, variables = _a.variables, _c = _a.returnPartialData, returnPartialData = _c === void 0 ? true : _c, _d = _a.canonizeResults, canonizeResults = _d === void 0 ? this.config.canonizeResults : _d;
            var policies = this.config.cache.policies;
            variables = __assign(__assign({}, getDefaultValues(getQueryDefinition(query))), variables);
            var rootRef = makeReference(rootId);
            var execResult = this.executeSelectionSet({
                selectionSet: getMainDefinition(query).selectionSet,
                objectOrReference: rootRef,
                enclosingRef: rootRef,
                context: {
                    store: store,
                    query: query,
                    policies: policies,
                    variables: variables,
                    varString: canonicalStringify(variables),
                    canonizeResults: canonizeResults,
                    fragmentMap: createFragmentMap(getFragmentDefinitions(query)),
                },
            });
            var missing;
            if (execResult.missing) {
                missing = [new MissingFieldError(firstMissing(execResult.missing), execResult.missing, query, variables)];
                if (!returnPartialData) {
                    throw missing[0];
                }
            }
            return {
                result: execResult.result,
                complete: !missing,
                missing: missing,
            };
        };
        StoreReader.prototype.isFresh = function (result, parent, selectionSet, context) {
            if (supportsResultCaching(context.store) &&
                this.knownResults.get(result) === selectionSet) {
                var latest = this.executeSelectionSet.peek(selectionSet, parent, context, this.canon.isKnown(result));
                if (latest && result === latest.result) {
                    return true;
                }
            }
            return false;
        };
        StoreReader.prototype.execSelectionSetImpl = function (_a) {
            var _this = this;
            var selectionSet = _a.selectionSet, objectOrReference = _a.objectOrReference, enclosingRef = _a.enclosingRef, context = _a.context;
            if (isReference(objectOrReference) &&
                !context.policies.rootTypenamesById[objectOrReference.__ref] &&
                !context.store.has(objectOrReference.__ref)) {
                return {
                    result: this.canon.empty,
                    missing: "Dangling reference to missing ".concat(objectOrReference.__ref, " object"),
                };
            }
            var variables = context.variables, policies = context.policies, store = context.store;
            var typename = store.getFieldValue(objectOrReference, "__typename");
            var objectsToMerge = [];
            var missing;
            var missingMerger = new DeepMerger();
            if (this.config.addTypename &&
                typeof typename === "string" &&
                !policies.rootIdsByTypename[typename]) {
                objectsToMerge.push({ __typename: typename });
            }
            function handleMissing(result, resultName) {
                var _a;
                if (result.missing) {
                    missing = missingMerger.merge(missing, (_a = {}, _a[resultName] = result.missing, _a));
                }
                return result.result;
            }
            var workSet = new Set(selectionSet.selections);
            workSet.forEach(function (selection) {
                var _a, _b;
                if (!shouldInclude(selection, variables))
                    return;
                if (isField(selection)) {
                    var fieldValue = policies.readField({
                        fieldName: selection.name.value,
                        field: selection,
                        variables: context.variables,
                        from: objectOrReference,
                    }, context);
                    var resultName = resultKeyNameFromField(selection);
                    if (fieldValue === void 0) {
                        if (!addTypenameToDocument.added(selection)) {
                            missing = missingMerger.merge(missing, (_a = {},
                                _a[resultName] = "Can't find field '".concat(selection.name.value, "' on ").concat(isReference(objectOrReference)
                                    ? objectOrReference.__ref + " object"
                                    : "object " + JSON.stringify(objectOrReference, null, 2)),
                                _a));
                        }
                    }
                    else if (isArray(fieldValue)) {
                        fieldValue = handleMissing(_this.executeSubSelectedArray({
                            field: selection,
                            array: fieldValue,
                            enclosingRef: enclosingRef,
                            context: context,
                        }), resultName);
                    }
                    else if (!selection.selectionSet) {
                        if (context.canonizeResults) {
                            fieldValue = _this.canon.pass(fieldValue);
                        }
                    }
                    else if (fieldValue != null) {
                        fieldValue = handleMissing(_this.executeSelectionSet({
                            selectionSet: selection.selectionSet,
                            objectOrReference: fieldValue,
                            enclosingRef: isReference(fieldValue) ? fieldValue : enclosingRef,
                            context: context,
                        }), resultName);
                    }
                    if (fieldValue !== void 0) {
                        objectsToMerge.push((_b = {}, _b[resultName] = fieldValue, _b));
                    }
                }
                else {
                    var fragment = getFragmentFromSelection(selection, context.fragmentMap);
                    if (fragment && policies.fragmentMatches(fragment, typename)) {
                        fragment.selectionSet.selections.forEach(workSet.add, workSet);
                    }
                }
            });
            var result = mergeDeepArray(objectsToMerge);
            var finalResult = { result: result, missing: missing };
            var frozen = context.canonizeResults
                ? this.canon.admit(finalResult)
                : maybeDeepFreeze(finalResult);
            if (frozen.result) {
                this.knownResults.set(frozen.result, selectionSet);
            }
            return frozen;
        };
        StoreReader.prototype.execSubSelectedArrayImpl = function (_a) {
            var _this = this;
            var field = _a.field, array = _a.array, enclosingRef = _a.enclosingRef, context = _a.context;
            var missing;
            var missingMerger = new DeepMerger();
            function handleMissing(childResult, i) {
                var _a;
                if (childResult.missing) {
                    missing = missingMerger.merge(missing, (_a = {}, _a[i] = childResult.missing, _a));
                }
                return childResult.result;
            }
            if (field.selectionSet) {
                array = array.filter(context.store.canRead);
            }
            array = array.map(function (item, i) {
                if (item === null) {
                    return null;
                }
                if (isArray(item)) {
                    return handleMissing(_this.executeSubSelectedArray({
                        field: field,
                        array: item,
                        enclosingRef: enclosingRef,
                        context: context,
                    }), i);
                }
                if (field.selectionSet) {
                    return handleMissing(_this.executeSelectionSet({
                        selectionSet: field.selectionSet,
                        objectOrReference: item,
                        enclosingRef: isReference(item) ? item : enclosingRef,
                        context: context,
                    }), i);
                }
                if (__DEV__) {
                    assertSelectionSetForIdValue(context.store, field, item);
                }
                return item;
            });
            return {
                result: context.canonizeResults ? this.canon.admit(array) : array,
                missing: missing,
            };
        };
        return StoreReader;
    }());
    function firstMissing(tree) {
        try {
            JSON.stringify(tree, function (_, value) {
                if (typeof value === "string")
                    throw value;
                return value;
            });
        }
        catch (result) {
            return result;
        }
    }
    function assertSelectionSetForIdValue(store, field, fieldValue) {
        if (!field.selectionSet) {
            var workSet_1 = new Set([fieldValue]);
            workSet_1.forEach(function (value) {
                if (isNonNullObject(value)) {
                    __DEV__ ? invariant$1(!isReference(value), "Missing selection set for object of type ".concat(getTypenameFromStoreObject(store, value), " returned for query field ").concat(field.name.value)) : invariant$1(!isReference(value), 5);
                    Object.values(value).forEach(workSet_1.add, workSet_1);
                }
            });
        }
    }

    var cacheSlot = new Slot();
    var cacheInfoMap = new WeakMap();
    function getCacheInfo(cache) {
        var info = cacheInfoMap.get(cache);
        if (!info) {
            cacheInfoMap.set(cache, info = {
                vars: new Set,
                dep: dep(),
            });
        }
        return info;
    }
    function forgetCache(cache) {
        getCacheInfo(cache).vars.forEach(function (rv) { return rv.forgetCache(cache); });
    }
    function recallCache(cache) {
        getCacheInfo(cache).vars.forEach(function (rv) { return rv.attachCache(cache); });
    }
    function makeVar(value) {
        var caches = new Set();
        var listeners = new Set();
        var rv = function (newValue) {
            if (arguments.length > 0) {
                if (value !== newValue) {
                    value = newValue;
                    caches.forEach(function (cache) {
                        getCacheInfo(cache).dep.dirty(rv);
                        broadcast(cache);
                    });
                    var oldListeners = Array.from(listeners);
                    listeners.clear();
                    oldListeners.forEach(function (listener) { return listener(value); });
                }
            }
            else {
                var cache = cacheSlot.getValue();
                if (cache) {
                    attach(cache);
                    getCacheInfo(cache).dep(rv);
                }
            }
            return value;
        };
        rv.onNextChange = function (listener) {
            listeners.add(listener);
            return function () {
                listeners.delete(listener);
            };
        };
        var attach = rv.attachCache = function (cache) {
            caches.add(cache);
            getCacheInfo(cache).vars.add(rv);
            return rv;
        };
        rv.forgetCache = function (cache) { return caches.delete(cache); };
        return rv;
    }
    function broadcast(cache) {
        if (cache.broadcastWatches) {
            cache.broadcastWatches();
        }
    }

    var specifierInfoCache = Object.create(null);
    function lookupSpecifierInfo(spec) {
        var cacheKey = JSON.stringify(spec);
        return specifierInfoCache[cacheKey] ||
            (specifierInfoCache[cacheKey] = Object.create(null));
    }
    function keyFieldsFnFromSpecifier(specifier) {
        var info = lookupSpecifierInfo(specifier);
        return info.keyFieldsFn || (info.keyFieldsFn = function (object, context) {
            var extract = function (from, key) { return context.readField(key, from); };
            var keyObject = context.keyObject = collectSpecifierPaths(specifier, function (schemaKeyPath) {
                var extracted = extractKeyPath(context.storeObject, schemaKeyPath, extract);
                if (extracted === void 0 &&
                    object !== context.storeObject &&
                    hasOwn.call(object, schemaKeyPath[0])) {
                    extracted = extractKeyPath(object, schemaKeyPath, extractKey);
                }
                __DEV__ ? invariant$1(extracted !== void 0, "Missing field '".concat(schemaKeyPath.join('.'), "' while extracting keyFields from ").concat(JSON.stringify(object))) : invariant$1(extracted !== void 0, 2);
                return extracted;
            });
            return "".concat(context.typename, ":").concat(JSON.stringify(keyObject));
        });
    }
    function keyArgsFnFromSpecifier(specifier) {
        var info = lookupSpecifierInfo(specifier);
        return info.keyArgsFn || (info.keyArgsFn = function (args, _a) {
            var field = _a.field, variables = _a.variables, fieldName = _a.fieldName;
            var collected = collectSpecifierPaths(specifier, function (keyPath) {
                var firstKey = keyPath[0];
                var firstChar = firstKey.charAt(0);
                if (firstChar === "@") {
                    if (field && isNonEmptyArray(field.directives)) {
                        var directiveName_1 = firstKey.slice(1);
                        var d = field.directives.find(function (d) { return d.name.value === directiveName_1; });
                        var directiveArgs = d && argumentsObjectFromField(d, variables);
                        return directiveArgs && extractKeyPath(directiveArgs, keyPath.slice(1));
                    }
                    return;
                }
                if (firstChar === "$") {
                    var variableName = firstKey.slice(1);
                    if (variables && hasOwn.call(variables, variableName)) {
                        var varKeyPath = keyPath.slice(0);
                        varKeyPath[0] = variableName;
                        return extractKeyPath(variables, varKeyPath);
                    }
                    return;
                }
                if (args) {
                    return extractKeyPath(args, keyPath);
                }
            });
            var suffix = JSON.stringify(collected);
            if (args || suffix !== "{}") {
                fieldName += ":" + suffix;
            }
            return fieldName;
        });
    }
    function collectSpecifierPaths(specifier, extractor) {
        var merger = new DeepMerger;
        return getSpecifierPaths(specifier).reduce(function (collected, path) {
            var _a;
            var toMerge = extractor(path);
            if (toMerge !== void 0) {
                for (var i = path.length - 1; i >= 0; --i) {
                    toMerge = (_a = {}, _a[path[i]] = toMerge, _a);
                }
                collected = merger.merge(collected, toMerge);
            }
            return collected;
        }, Object.create(null));
    }
    function getSpecifierPaths(spec) {
        var info = lookupSpecifierInfo(spec);
        if (!info.paths) {
            var paths_1 = info.paths = [];
            var currentPath_1 = [];
            spec.forEach(function (s, i) {
                if (isArray(s)) {
                    getSpecifierPaths(s).forEach(function (p) { return paths_1.push(currentPath_1.concat(p)); });
                    currentPath_1.length = 0;
                }
                else {
                    currentPath_1.push(s);
                    if (!isArray(spec[i + 1])) {
                        paths_1.push(currentPath_1.slice(0));
                        currentPath_1.length = 0;
                    }
                }
            });
        }
        return info.paths;
    }
    function extractKey(object, key) {
        return object[key];
    }
    function extractKeyPath(object, path, extract) {
        extract = extract || extractKey;
        return normalize$1(path.reduce(function reducer(obj, key) {
            return isArray(obj)
                ? obj.map(function (child) { return reducer(child, key); })
                : obj && extract(obj, key);
        }, object));
    }
    function normalize$1(value) {
        if (isNonNullObject(value)) {
            if (isArray(value)) {
                return value.map(normalize$1);
            }
            return collectSpecifierPaths(Object.keys(value).sort(), function (path) { return extractKeyPath(value, path); });
        }
        return value;
    }

    getStoreKeyName.setStringify(canonicalStringify);
    function argsFromFieldSpecifier(spec) {
        return spec.args !== void 0 ? spec.args :
            spec.field ? argumentsObjectFromField(spec.field, spec.variables) : null;
    }
    var nullKeyFieldsFn = function () { return void 0; };
    var simpleKeyArgsFn = function (_args, context) { return context.fieldName; };
    var mergeTrueFn = function (existing, incoming, _a) {
        var mergeObjects = _a.mergeObjects;
        return mergeObjects(existing, incoming);
    };
    var mergeFalseFn = function (_, incoming) { return incoming; };
    var Policies = (function () {
        function Policies(config) {
            this.config = config;
            this.typePolicies = Object.create(null);
            this.toBeAdded = Object.create(null);
            this.supertypeMap = new Map();
            this.fuzzySubtypes = new Map();
            this.rootIdsByTypename = Object.create(null);
            this.rootTypenamesById = Object.create(null);
            this.usingPossibleTypes = false;
            this.config = __assign({ dataIdFromObject: defaultDataIdFromObject }, config);
            this.cache = this.config.cache;
            this.setRootTypename("Query");
            this.setRootTypename("Mutation");
            this.setRootTypename("Subscription");
            if (config.possibleTypes) {
                this.addPossibleTypes(config.possibleTypes);
            }
            if (config.typePolicies) {
                this.addTypePolicies(config.typePolicies);
            }
        }
        Policies.prototype.identify = function (object, partialContext) {
            var _a;
            var policies = this;
            var typename = partialContext && (partialContext.typename ||
                ((_a = partialContext.storeObject) === null || _a === void 0 ? void 0 : _a.__typename)) || object.__typename;
            if (typename === this.rootTypenamesById.ROOT_QUERY) {
                return ["ROOT_QUERY"];
            }
            var storeObject = partialContext && partialContext.storeObject || object;
            var context = __assign(__assign({}, partialContext), { typename: typename, storeObject: storeObject, readField: partialContext && partialContext.readField || function () {
                    var options = normalizeReadFieldOptions(arguments, storeObject);
                    return policies.readField(options, {
                        store: policies.cache["data"],
                        variables: options.variables,
                    });
                } });
            var id;
            var policy = typename && this.getTypePolicy(typename);
            var keyFn = policy && policy.keyFn || this.config.dataIdFromObject;
            while (keyFn) {
                var specifierOrId = keyFn(object, context);
                if (isArray(specifierOrId)) {
                    keyFn = keyFieldsFnFromSpecifier(specifierOrId);
                }
                else {
                    id = specifierOrId;
                    break;
                }
            }
            id = id ? String(id) : void 0;
            return context.keyObject ? [id, context.keyObject] : [id];
        };
        Policies.prototype.addTypePolicies = function (typePolicies) {
            var _this = this;
            Object.keys(typePolicies).forEach(function (typename) {
                var _a = typePolicies[typename], queryType = _a.queryType, mutationType = _a.mutationType, subscriptionType = _a.subscriptionType, incoming = __rest(_a, ["queryType", "mutationType", "subscriptionType"]);
                if (queryType)
                    _this.setRootTypename("Query", typename);
                if (mutationType)
                    _this.setRootTypename("Mutation", typename);
                if (subscriptionType)
                    _this.setRootTypename("Subscription", typename);
                if (hasOwn.call(_this.toBeAdded, typename)) {
                    _this.toBeAdded[typename].push(incoming);
                }
                else {
                    _this.toBeAdded[typename] = [incoming];
                }
            });
        };
        Policies.prototype.updateTypePolicy = function (typename, incoming) {
            var _this = this;
            var existing = this.getTypePolicy(typename);
            var keyFields = incoming.keyFields, fields = incoming.fields;
            function setMerge(existing, merge) {
                existing.merge =
                    typeof merge === "function" ? merge :
                        merge === true ? mergeTrueFn :
                            merge === false ? mergeFalseFn :
                                existing.merge;
            }
            setMerge(existing, incoming.merge);
            existing.keyFn =
                keyFields === false ? nullKeyFieldsFn :
                    isArray(keyFields) ? keyFieldsFnFromSpecifier(keyFields) :
                        typeof keyFields === "function" ? keyFields :
                            existing.keyFn;
            if (fields) {
                Object.keys(fields).forEach(function (fieldName) {
                    var existing = _this.getFieldPolicy(typename, fieldName, true);
                    var incoming = fields[fieldName];
                    if (typeof incoming === "function") {
                        existing.read = incoming;
                    }
                    else {
                        var keyArgs = incoming.keyArgs, read = incoming.read, merge = incoming.merge;
                        existing.keyFn =
                            keyArgs === false ? simpleKeyArgsFn :
                                isArray(keyArgs) ? keyArgsFnFromSpecifier(keyArgs) :
                                    typeof keyArgs === "function" ? keyArgs :
                                        existing.keyFn;
                        if (typeof read === "function") {
                            existing.read = read;
                        }
                        setMerge(existing, merge);
                    }
                    if (existing.read && existing.merge) {
                        existing.keyFn = existing.keyFn || simpleKeyArgsFn;
                    }
                });
            }
        };
        Policies.prototype.setRootTypename = function (which, typename) {
            if (typename === void 0) { typename = which; }
            var rootId = "ROOT_" + which.toUpperCase();
            var old = this.rootTypenamesById[rootId];
            if (typename !== old) {
                __DEV__ ? invariant$1(!old || old === which, "Cannot change root ".concat(which, " __typename more than once")) : invariant$1(!old || old === which, 3);
                if (old)
                    delete this.rootIdsByTypename[old];
                this.rootIdsByTypename[typename] = rootId;
                this.rootTypenamesById[rootId] = typename;
            }
        };
        Policies.prototype.addPossibleTypes = function (possibleTypes) {
            var _this = this;
            this.usingPossibleTypes = true;
            Object.keys(possibleTypes).forEach(function (supertype) {
                _this.getSupertypeSet(supertype, true);
                possibleTypes[supertype].forEach(function (subtype) {
                    _this.getSupertypeSet(subtype, true).add(supertype);
                    var match = subtype.match(TypeOrFieldNameRegExp);
                    if (!match || match[0] !== subtype) {
                        _this.fuzzySubtypes.set(subtype, new RegExp(subtype));
                    }
                });
            });
        };
        Policies.prototype.getTypePolicy = function (typename) {
            var _this = this;
            if (!hasOwn.call(this.typePolicies, typename)) {
                var policy_1 = this.typePolicies[typename] = Object.create(null);
                policy_1.fields = Object.create(null);
                var supertypes = this.supertypeMap.get(typename);
                if (supertypes && supertypes.size) {
                    supertypes.forEach(function (supertype) {
                        var _a = _this.getTypePolicy(supertype), fields = _a.fields, rest = __rest(_a, ["fields"]);
                        Object.assign(policy_1, rest);
                        Object.assign(policy_1.fields, fields);
                    });
                }
            }
            var inbox = this.toBeAdded[typename];
            if (inbox && inbox.length) {
                inbox.splice(0).forEach(function (policy) {
                    _this.updateTypePolicy(typename, policy);
                });
            }
            return this.typePolicies[typename];
        };
        Policies.prototype.getFieldPolicy = function (typename, fieldName, createIfMissing) {
            if (typename) {
                var fieldPolicies = this.getTypePolicy(typename).fields;
                return fieldPolicies[fieldName] || (createIfMissing && (fieldPolicies[fieldName] = Object.create(null)));
            }
        };
        Policies.prototype.getSupertypeSet = function (subtype, createIfMissing) {
            var supertypeSet = this.supertypeMap.get(subtype);
            if (!supertypeSet && createIfMissing) {
                this.supertypeMap.set(subtype, supertypeSet = new Set());
            }
            return supertypeSet;
        };
        Policies.prototype.fragmentMatches = function (fragment, typename, result, variables) {
            var _this = this;
            if (!fragment.typeCondition)
                return true;
            if (!typename)
                return false;
            var supertype = fragment.typeCondition.name.value;
            if (typename === supertype)
                return true;
            if (this.usingPossibleTypes &&
                this.supertypeMap.has(supertype)) {
                var typenameSupertypeSet = this.getSupertypeSet(typename, true);
                var workQueue_1 = [typenameSupertypeSet];
                var maybeEnqueue_1 = function (subtype) {
                    var supertypeSet = _this.getSupertypeSet(subtype, false);
                    if (supertypeSet &&
                        supertypeSet.size &&
                        workQueue_1.indexOf(supertypeSet) < 0) {
                        workQueue_1.push(supertypeSet);
                    }
                };
                var needToCheckFuzzySubtypes = !!(result && this.fuzzySubtypes.size);
                var checkingFuzzySubtypes = false;
                for (var i = 0; i < workQueue_1.length; ++i) {
                    var supertypeSet = workQueue_1[i];
                    if (supertypeSet.has(supertype)) {
                        if (!typenameSupertypeSet.has(supertype)) {
                            if (checkingFuzzySubtypes) {
                                __DEV__ && invariant$1.warn("Inferring subtype ".concat(typename, " of supertype ").concat(supertype));
                            }
                            typenameSupertypeSet.add(supertype);
                        }
                        return true;
                    }
                    supertypeSet.forEach(maybeEnqueue_1);
                    if (needToCheckFuzzySubtypes &&
                        i === workQueue_1.length - 1 &&
                        selectionSetMatchesResult(fragment.selectionSet, result, variables)) {
                        needToCheckFuzzySubtypes = false;
                        checkingFuzzySubtypes = true;
                        this.fuzzySubtypes.forEach(function (regExp, fuzzyString) {
                            var match = typename.match(regExp);
                            if (match && match[0] === typename) {
                                maybeEnqueue_1(fuzzyString);
                            }
                        });
                    }
                }
            }
            return false;
        };
        Policies.prototype.hasKeyArgs = function (typename, fieldName) {
            var policy = this.getFieldPolicy(typename, fieldName, false);
            return !!(policy && policy.keyFn);
        };
        Policies.prototype.getStoreFieldName = function (fieldSpec) {
            var typename = fieldSpec.typename, fieldName = fieldSpec.fieldName;
            var policy = this.getFieldPolicy(typename, fieldName, false);
            var storeFieldName;
            var keyFn = policy && policy.keyFn;
            if (keyFn && typename) {
                var context = {
                    typename: typename,
                    fieldName: fieldName,
                    field: fieldSpec.field || null,
                    variables: fieldSpec.variables,
                };
                var args = argsFromFieldSpecifier(fieldSpec);
                while (keyFn) {
                    var specifierOrString = keyFn(args, context);
                    if (isArray(specifierOrString)) {
                        keyFn = keyArgsFnFromSpecifier(specifierOrString);
                    }
                    else {
                        storeFieldName = specifierOrString || fieldName;
                        break;
                    }
                }
            }
            if (storeFieldName === void 0) {
                storeFieldName = fieldSpec.field
                    ? storeKeyNameFromField(fieldSpec.field, fieldSpec.variables)
                    : getStoreKeyName(fieldName, argsFromFieldSpecifier(fieldSpec));
            }
            if (storeFieldName === false) {
                return fieldName;
            }
            return fieldName === fieldNameFromStoreName(storeFieldName)
                ? storeFieldName
                : fieldName + ":" + storeFieldName;
        };
        Policies.prototype.readField = function (options, context) {
            var objectOrReference = options.from;
            if (!objectOrReference)
                return;
            var nameOrField = options.field || options.fieldName;
            if (!nameOrField)
                return;
            if (options.typename === void 0) {
                var typename = context.store.getFieldValue(objectOrReference, "__typename");
                if (typename)
                    options.typename = typename;
            }
            var storeFieldName = this.getStoreFieldName(options);
            var fieldName = fieldNameFromStoreName(storeFieldName);
            var existing = context.store.getFieldValue(objectOrReference, storeFieldName);
            var policy = this.getFieldPolicy(options.typename, fieldName, false);
            var read = policy && policy.read;
            if (read) {
                var readOptions = makeFieldFunctionOptions(this, objectOrReference, options, context, context.store.getStorage(isReference(objectOrReference)
                    ? objectOrReference.__ref
                    : objectOrReference, storeFieldName));
                return cacheSlot.withValue(this.cache, read, [existing, readOptions]);
            }
            return existing;
        };
        Policies.prototype.getReadFunction = function (typename, fieldName) {
            var policy = this.getFieldPolicy(typename, fieldName, false);
            return policy && policy.read;
        };
        Policies.prototype.getMergeFunction = function (parentTypename, fieldName, childTypename) {
            var policy = this.getFieldPolicy(parentTypename, fieldName, false);
            var merge = policy && policy.merge;
            if (!merge && childTypename) {
                policy = this.getTypePolicy(childTypename);
                merge = policy && policy.merge;
            }
            return merge;
        };
        Policies.prototype.runMergeFunction = function (existing, incoming, _a, context, storage) {
            var field = _a.field, typename = _a.typename, merge = _a.merge;
            if (merge === mergeTrueFn) {
                return makeMergeObjectsFunction(context.store)(existing, incoming);
            }
            if (merge === mergeFalseFn) {
                return incoming;
            }
            if (context.overwrite) {
                existing = void 0;
            }
            return merge(existing, incoming, makeFieldFunctionOptions(this, void 0, { typename: typename, fieldName: field.name.value, field: field, variables: context.variables }, context, storage || Object.create(null)));
        };
        return Policies;
    }());
    function makeFieldFunctionOptions(policies, objectOrReference, fieldSpec, context, storage) {
        var storeFieldName = policies.getStoreFieldName(fieldSpec);
        var fieldName = fieldNameFromStoreName(storeFieldName);
        var variables = fieldSpec.variables || context.variables;
        var _a = context.store, toReference = _a.toReference, canRead = _a.canRead;
        return {
            args: argsFromFieldSpecifier(fieldSpec),
            field: fieldSpec.field || null,
            fieldName: fieldName,
            storeFieldName: storeFieldName,
            variables: variables,
            isReference: isReference,
            toReference: toReference,
            storage: storage,
            cache: policies.cache,
            canRead: canRead,
            readField: function () {
                return policies.readField(normalizeReadFieldOptions(arguments, objectOrReference, variables), context);
            },
            mergeObjects: makeMergeObjectsFunction(context.store),
        };
    }
    function normalizeReadFieldOptions(readFieldArgs, objectOrReference, variables) {
        var fieldNameOrOptions = readFieldArgs[0], from = readFieldArgs[1], argc = readFieldArgs.length;
        var options;
        if (typeof fieldNameOrOptions === "string") {
            options = {
                fieldName: fieldNameOrOptions,
                from: argc > 1 ? from : objectOrReference,
            };
        }
        else {
            options = __assign({}, fieldNameOrOptions);
            if (!hasOwn.call(options, "from")) {
                options.from = objectOrReference;
            }
        }
        if (__DEV__ && options.from === void 0) {
            __DEV__ && invariant$1.warn("Undefined 'from' passed to readField with arguments ".concat(stringifyForDisplay(Array.from(readFieldArgs))));
        }
        if (void 0 === options.variables) {
            options.variables = variables;
        }
        return options;
    }
    function makeMergeObjectsFunction(store) {
        return function mergeObjects(existing, incoming) {
            if (isArray(existing) || isArray(incoming)) {
                throw __DEV__ ? new InvariantError("Cannot automatically merge arrays") : new InvariantError(4);
            }
            if (isNonNullObject(existing) &&
                isNonNullObject(incoming)) {
                var eType = store.getFieldValue(existing, "__typename");
                var iType = store.getFieldValue(incoming, "__typename");
                var typesDiffer = eType && iType && eType !== iType;
                if (typesDiffer) {
                    return incoming;
                }
                if (isReference(existing) &&
                    storeValueIsStoreObject(incoming)) {
                    store.merge(existing.__ref, incoming);
                    return existing;
                }
                if (storeValueIsStoreObject(existing) &&
                    isReference(incoming)) {
                    store.merge(existing, incoming.__ref);
                    return incoming;
                }
                if (storeValueIsStoreObject(existing) &&
                    storeValueIsStoreObject(incoming)) {
                    return __assign(__assign({}, existing), incoming);
                }
            }
            return incoming;
        };
    }

    function getContextFlavor(context, clientOnly, deferred) {
        var key = "".concat(clientOnly).concat(deferred);
        var flavored = context.flavors.get(key);
        if (!flavored) {
            context.flavors.set(key, flavored = (context.clientOnly === clientOnly &&
                context.deferred === deferred) ? context : __assign(__assign({}, context), { clientOnly: clientOnly, deferred: deferred }));
        }
        return flavored;
    }
    var StoreWriter = (function () {
        function StoreWriter(cache, reader) {
            this.cache = cache;
            this.reader = reader;
        }
        StoreWriter.prototype.writeToStore = function (store, _a) {
            var _this = this;
            var query = _a.query, result = _a.result, dataId = _a.dataId, variables = _a.variables, overwrite = _a.overwrite;
            var operationDefinition = getOperationDefinition(query);
            var merger = makeProcessedFieldsMerger();
            variables = __assign(__assign({}, getDefaultValues(operationDefinition)), variables);
            var context = {
                store: store,
                written: Object.create(null),
                merge: function (existing, incoming) {
                    return merger.merge(existing, incoming);
                },
                variables: variables,
                varString: canonicalStringify(variables),
                fragmentMap: createFragmentMap(getFragmentDefinitions(query)),
                overwrite: !!overwrite,
                incomingById: new Map,
                clientOnly: false,
                deferred: false,
                flavors: new Map,
            };
            var ref = this.processSelectionSet({
                result: result || Object.create(null),
                dataId: dataId,
                selectionSet: operationDefinition.selectionSet,
                mergeTree: { map: new Map },
                context: context,
            });
            if (!isReference(ref)) {
                throw __DEV__ ? new InvariantError("Could not identify object ".concat(JSON.stringify(result))) : new InvariantError(6);
            }
            context.incomingById.forEach(function (_a, dataId) {
                var storeObject = _a.storeObject, mergeTree = _a.mergeTree, fieldNodeSet = _a.fieldNodeSet;
                var entityRef = makeReference(dataId);
                if (mergeTree && mergeTree.map.size) {
                    var applied = _this.applyMerges(mergeTree, entityRef, storeObject, context);
                    if (isReference(applied)) {
                        return;
                    }
                    storeObject = applied;
                }
                if (__DEV__ && !context.overwrite) {
                    var fieldsWithSelectionSets_1 = Object.create(null);
                    fieldNodeSet.forEach(function (field) {
                        if (field.selectionSet) {
                            fieldsWithSelectionSets_1[field.name.value] = true;
                        }
                    });
                    var hasSelectionSet_1 = function (storeFieldName) {
                        return fieldsWithSelectionSets_1[fieldNameFromStoreName(storeFieldName)] === true;
                    };
                    var hasMergeFunction_1 = function (storeFieldName) {
                        var childTree = mergeTree && mergeTree.map.get(storeFieldName);
                        return Boolean(childTree && childTree.info && childTree.info.merge);
                    };
                    Object.keys(storeObject).forEach(function (storeFieldName) {
                        if (hasSelectionSet_1(storeFieldName) &&
                            !hasMergeFunction_1(storeFieldName)) {
                            warnAboutDataLoss(entityRef, storeObject, storeFieldName, context.store);
                        }
                    });
                }
                store.merge(dataId, storeObject);
            });
            store.retain(ref.__ref);
            return ref;
        };
        StoreWriter.prototype.processSelectionSet = function (_a) {
            var _this = this;
            var dataId = _a.dataId, result = _a.result, selectionSet = _a.selectionSet, context = _a.context, mergeTree = _a.mergeTree;
            var policies = this.cache.policies;
            var incoming = Object.create(null);
            var typename = (dataId && policies.rootTypenamesById[dataId]) ||
                getTypenameFromResult(result, selectionSet, context.fragmentMap) ||
                (dataId && context.store.get(dataId, "__typename"));
            if ("string" === typeof typename) {
                incoming.__typename = typename;
            }
            var readField = function () {
                var options = normalizeReadFieldOptions(arguments, incoming, context.variables);
                if (isReference(options.from)) {
                    var info = context.incomingById.get(options.from.__ref);
                    if (info) {
                        var result_1 = policies.readField(__assign(__assign({}, options), { from: info.storeObject }), context);
                        if (result_1 !== void 0) {
                            return result_1;
                        }
                    }
                }
                return policies.readField(options, context);
            };
            var fieldNodeSet = new Set();
            this.flattenFields(selectionSet, result, context, typename).forEach(function (context, field) {
                var _a;
                var resultFieldKey = resultKeyNameFromField(field);
                var value = result[resultFieldKey];
                fieldNodeSet.add(field);
                if (value !== void 0) {
                    var storeFieldName = policies.getStoreFieldName({
                        typename: typename,
                        fieldName: field.name.value,
                        field: field,
                        variables: context.variables,
                    });
                    var childTree = getChildMergeTree(mergeTree, storeFieldName);
                    var incomingValue = _this.processFieldValue(value, field, field.selectionSet
                        ? getContextFlavor(context, false, false)
                        : context, childTree);
                    var childTypename = void 0;
                    if (field.selectionSet &&
                        (isReference(incomingValue) ||
                            storeValueIsStoreObject(incomingValue))) {
                        childTypename = readField("__typename", incomingValue);
                    }
                    var merge = policies.getMergeFunction(typename, field.name.value, childTypename);
                    if (merge) {
                        childTree.info = {
                            field: field,
                            typename: typename,
                            merge: merge,
                        };
                    }
                    else {
                        maybeRecycleChildMergeTree(mergeTree, storeFieldName);
                    }
                    incoming = context.merge(incoming, (_a = {},
                        _a[storeFieldName] = incomingValue,
                        _a));
                }
                else if (__DEV__ &&
                    !context.clientOnly &&
                    !context.deferred &&
                    !addTypenameToDocument.added(field) &&
                    !policies.getReadFunction(typename, field.name.value)) {
                    __DEV__ && invariant$1.error("Missing field '".concat(resultKeyNameFromField(field), "' while writing result ").concat(JSON.stringify(result, null, 2)).substring(0, 1000));
                }
            });
            try {
                var _b = policies.identify(result, {
                    typename: typename,
                    selectionSet: selectionSet,
                    fragmentMap: context.fragmentMap,
                    storeObject: incoming,
                    readField: readField,
                }), id = _b[0], keyObject = _b[1];
                dataId = dataId || id;
                if (keyObject) {
                    incoming = context.merge(incoming, keyObject);
                }
            }
            catch (e) {
                if (!dataId)
                    throw e;
            }
            if ("string" === typeof dataId) {
                var dataRef = makeReference(dataId);
                var sets = context.written[dataId] || (context.written[dataId] = []);
                if (sets.indexOf(selectionSet) >= 0)
                    return dataRef;
                sets.push(selectionSet);
                if (this.reader && this.reader.isFresh(result, dataRef, selectionSet, context)) {
                    return dataRef;
                }
                var previous_1 = context.incomingById.get(dataId);
                if (previous_1) {
                    previous_1.storeObject = context.merge(previous_1.storeObject, incoming);
                    previous_1.mergeTree = mergeMergeTrees(previous_1.mergeTree, mergeTree);
                    fieldNodeSet.forEach(function (field) { return previous_1.fieldNodeSet.add(field); });
                }
                else {
                    context.incomingById.set(dataId, {
                        storeObject: incoming,
                        mergeTree: mergeTreeIsEmpty(mergeTree) ? void 0 : mergeTree,
                        fieldNodeSet: fieldNodeSet,
                    });
                }
                return dataRef;
            }
            return incoming;
        };
        StoreWriter.prototype.processFieldValue = function (value, field, context, mergeTree) {
            var _this = this;
            if (!field.selectionSet || value === null) {
                return __DEV__ ? cloneDeep(value) : value;
            }
            if (isArray(value)) {
                return value.map(function (item, i) {
                    var value = _this.processFieldValue(item, field, context, getChildMergeTree(mergeTree, i));
                    maybeRecycleChildMergeTree(mergeTree, i);
                    return value;
                });
            }
            return this.processSelectionSet({
                result: value,
                selectionSet: field.selectionSet,
                context: context,
                mergeTree: mergeTree,
            });
        };
        StoreWriter.prototype.flattenFields = function (selectionSet, result, context, typename) {
            if (typename === void 0) { typename = getTypenameFromResult(result, selectionSet, context.fragmentMap); }
            var fieldMap = new Map();
            var policies = this.cache.policies;
            var limitingTrie = new Trie(false);
            (function flatten(selectionSet, inheritedContext) {
                var visitedNode = limitingTrie.lookup(selectionSet, inheritedContext.clientOnly, inheritedContext.deferred);
                if (visitedNode.visited)
                    return;
                visitedNode.visited = true;
                selectionSet.selections.forEach(function (selection) {
                    if (!shouldInclude(selection, context.variables))
                        return;
                    var clientOnly = inheritedContext.clientOnly, deferred = inheritedContext.deferred;
                    if (!(clientOnly && deferred) &&
                        isNonEmptyArray(selection.directives)) {
                        selection.directives.forEach(function (dir) {
                            var name = dir.name.value;
                            if (name === "client")
                                clientOnly = true;
                            if (name === "defer") {
                                var args = argumentsObjectFromField(dir, context.variables);
                                if (!args || args.if !== false) {
                                    deferred = true;
                                }
                            }
                        });
                    }
                    if (isField(selection)) {
                        var existing = fieldMap.get(selection);
                        if (existing) {
                            clientOnly = clientOnly && existing.clientOnly;
                            deferred = deferred && existing.deferred;
                        }
                        fieldMap.set(selection, getContextFlavor(context, clientOnly, deferred));
                    }
                    else {
                        var fragment = getFragmentFromSelection(selection, context.fragmentMap);
                        if (fragment &&
                            policies.fragmentMatches(fragment, typename, result, context.variables)) {
                            flatten(fragment.selectionSet, getContextFlavor(context, clientOnly, deferred));
                        }
                    }
                });
            })(selectionSet, context);
            return fieldMap;
        };
        StoreWriter.prototype.applyMerges = function (mergeTree, existing, incoming, context, getStorageArgs) {
            var _a;
            var _this = this;
            if (mergeTree.map.size && !isReference(incoming)) {
                var e_1 = (!isArray(incoming) &&
                    (isReference(existing) || storeValueIsStoreObject(existing))) ? existing : void 0;
                var i_1 = incoming;
                if (e_1 && !getStorageArgs) {
                    getStorageArgs = [isReference(e_1) ? e_1.__ref : e_1];
                }
                var changedFields_1;
                var getValue_1 = function (from, name) {
                    return isArray(from)
                        ? (typeof name === "number" ? from[name] : void 0)
                        : context.store.getFieldValue(from, String(name));
                };
                mergeTree.map.forEach(function (childTree, storeFieldName) {
                    var eVal = getValue_1(e_1, storeFieldName);
                    var iVal = getValue_1(i_1, storeFieldName);
                    if (void 0 === iVal)
                        return;
                    if (getStorageArgs) {
                        getStorageArgs.push(storeFieldName);
                    }
                    var aVal = _this.applyMerges(childTree, eVal, iVal, context, getStorageArgs);
                    if (aVal !== iVal) {
                        changedFields_1 = changedFields_1 || new Map;
                        changedFields_1.set(storeFieldName, aVal);
                    }
                    if (getStorageArgs) {
                        invariant$1(getStorageArgs.pop() === storeFieldName);
                    }
                });
                if (changedFields_1) {
                    incoming = (isArray(i_1) ? i_1.slice(0) : __assign({}, i_1));
                    changedFields_1.forEach(function (value, name) {
                        incoming[name] = value;
                    });
                }
            }
            if (mergeTree.info) {
                return this.cache.policies.runMergeFunction(existing, incoming, mergeTree.info, context, getStorageArgs && (_a = context.store).getStorage.apply(_a, getStorageArgs));
            }
            return incoming;
        };
        return StoreWriter;
    }());
    var emptyMergeTreePool = [];
    function getChildMergeTree(_a, name) {
        var map = _a.map;
        if (!map.has(name)) {
            map.set(name, emptyMergeTreePool.pop() || { map: new Map });
        }
        return map.get(name);
    }
    function mergeMergeTrees(left, right) {
        if (left === right || !right || mergeTreeIsEmpty(right))
            return left;
        if (!left || mergeTreeIsEmpty(left))
            return right;
        var info = left.info && right.info ? __assign(__assign({}, left.info), right.info) : left.info || right.info;
        var needToMergeMaps = left.map.size && right.map.size;
        var map = needToMergeMaps ? new Map :
            left.map.size ? left.map : right.map;
        var merged = { info: info, map: map };
        if (needToMergeMaps) {
            var remainingRightKeys_1 = new Set(right.map.keys());
            left.map.forEach(function (leftTree, key) {
                merged.map.set(key, mergeMergeTrees(leftTree, right.map.get(key)));
                remainingRightKeys_1.delete(key);
            });
            remainingRightKeys_1.forEach(function (key) {
                merged.map.set(key, mergeMergeTrees(right.map.get(key), left.map.get(key)));
            });
        }
        return merged;
    }
    function mergeTreeIsEmpty(tree) {
        return !tree || !(tree.info || tree.map.size);
    }
    function maybeRecycleChildMergeTree(_a, name) {
        var map = _a.map;
        var childTree = map.get(name);
        if (childTree && mergeTreeIsEmpty(childTree)) {
            emptyMergeTreePool.push(childTree);
            map.delete(name);
        }
    }
    var warnings = new Set();
    function warnAboutDataLoss(existingRef, incomingObj, storeFieldName, store) {
        var getChild = function (objOrRef) {
            var child = store.getFieldValue(objOrRef, storeFieldName);
            return typeof child === "object" && child;
        };
        var existing = getChild(existingRef);
        if (!existing)
            return;
        var incoming = getChild(incomingObj);
        if (!incoming)
            return;
        if (isReference(existing))
            return;
        if (equal(existing, incoming))
            return;
        if (Object.keys(existing).every(function (key) { return store.getFieldValue(incoming, key) !== void 0; })) {
            return;
        }
        var parentType = store.getFieldValue(existingRef, "__typename") ||
            store.getFieldValue(incomingObj, "__typename");
        var fieldName = fieldNameFromStoreName(storeFieldName);
        var typeDotName = "".concat(parentType, ".").concat(fieldName);
        if (warnings.has(typeDotName))
            return;
        warnings.add(typeDotName);
        var childTypenames = [];
        if (!isArray(existing) &&
            !isArray(incoming)) {
            [existing, incoming].forEach(function (child) {
                var typename = store.getFieldValue(child, "__typename");
                if (typeof typename === "string" &&
                    !childTypenames.includes(typename)) {
                    childTypenames.push(typename);
                }
            });
        }
        __DEV__ && invariant$1.warn("Cache data may be lost when replacing the ".concat(fieldName, " field of a ").concat(parentType, " object.\n\nTo address this problem (which is not a bug in Apollo Client), ").concat(childTypenames.length
            ? "either ensure all objects of type " +
                childTypenames.join(" and ") + " have an ID or a custom merge function, or "
            : "", "define a custom merge function for the ").concat(typeDotName, " field, so InMemoryCache can safely merge these objects:\n\n  existing: ").concat(JSON.stringify(existing).slice(0, 1000), "\n  incoming: ").concat(JSON.stringify(incoming).slice(0, 1000), "\n\nFor more information about these options, please refer to the documentation:\n\n  * Ensuring entity objects have IDs: https://go.apollo.dev/c/generating-unique-identifiers\n  * Defining custom merge functions: https://go.apollo.dev/c/merging-non-normalized-objects\n"));
    }

    var InMemoryCache = (function (_super) {
        __extends(InMemoryCache, _super);
        function InMemoryCache(config) {
            if (config === void 0) { config = {}; }
            var _this = _super.call(this) || this;
            _this.watches = new Set();
            _this.typenameDocumentCache = new Map();
            _this.makeVar = makeVar;
            _this.txCount = 0;
            _this.config = normalizeConfig(config);
            _this.addTypename = !!_this.config.addTypename;
            _this.policies = new Policies({
                cache: _this,
                dataIdFromObject: _this.config.dataIdFromObject,
                possibleTypes: _this.config.possibleTypes,
                typePolicies: _this.config.typePolicies,
            });
            _this.init();
            return _this;
        }
        InMemoryCache.prototype.init = function () {
            var rootStore = this.data = new EntityStore.Root({
                policies: this.policies,
                resultCaching: this.config.resultCaching,
            });
            this.optimisticData = rootStore.stump;
            this.resetResultCache();
        };
        InMemoryCache.prototype.resetResultCache = function (resetResultIdentities) {
            var _this = this;
            var previousReader = this.storeReader;
            this.storeWriter = new StoreWriter(this, this.storeReader = new StoreReader({
                cache: this,
                addTypename: this.addTypename,
                resultCacheMaxSize: this.config.resultCacheMaxSize,
                canonizeResults: shouldCanonizeResults(this.config),
                canon: resetResultIdentities
                    ? void 0
                    : previousReader && previousReader.canon,
            }));
            this.maybeBroadcastWatch = wrap(function (c, options) {
                return _this.broadcastWatch(c, options);
            }, {
                max: this.config.resultCacheMaxSize,
                makeCacheKey: function (c) {
                    var store = c.optimistic ? _this.optimisticData : _this.data;
                    if (supportsResultCaching(store)) {
                        var optimistic = c.optimistic, rootId = c.rootId, variables = c.variables;
                        return store.makeCacheKey(c.query, c.callback, canonicalStringify({ optimistic: optimistic, rootId: rootId, variables: variables }));
                    }
                }
            });
            new Set([
                this.data.group,
                this.optimisticData.group,
            ]).forEach(function (group) { return group.resetCaching(); });
        };
        InMemoryCache.prototype.restore = function (data) {
            this.init();
            if (data)
                this.data.replace(data);
            return this;
        };
        InMemoryCache.prototype.extract = function (optimistic) {
            if (optimistic === void 0) { optimistic = false; }
            return (optimistic ? this.optimisticData : this.data).extract();
        };
        InMemoryCache.prototype.read = function (options) {
            var _a = options.returnPartialData, returnPartialData = _a === void 0 ? false : _a;
            try {
                return this.storeReader.diffQueryAgainstStore(__assign(__assign({}, options), { store: options.optimistic ? this.optimisticData : this.data, config: this.config, returnPartialData: returnPartialData })).result || null;
            }
            catch (e) {
                if (e instanceof MissingFieldError) {
                    return null;
                }
                throw e;
            }
        };
        InMemoryCache.prototype.write = function (options) {
            try {
                ++this.txCount;
                return this.storeWriter.writeToStore(this.data, options);
            }
            finally {
                if (!--this.txCount && options.broadcast !== false) {
                    this.broadcastWatches();
                }
            }
        };
        InMemoryCache.prototype.modify = function (options) {
            if (hasOwn.call(options, "id") && !options.id) {
                return false;
            }
            var store = options.optimistic
                ? this.optimisticData
                : this.data;
            try {
                ++this.txCount;
                return store.modify(options.id || "ROOT_QUERY", options.fields);
            }
            finally {
                if (!--this.txCount && options.broadcast !== false) {
                    this.broadcastWatches();
                }
            }
        };
        InMemoryCache.prototype.diff = function (options) {
            return this.storeReader.diffQueryAgainstStore(__assign(__assign({}, options), { store: options.optimistic ? this.optimisticData : this.data, rootId: options.id || "ROOT_QUERY", config: this.config }));
        };
        InMemoryCache.prototype.watch = function (watch) {
            var _this = this;
            if (!this.watches.size) {
                recallCache(this);
            }
            this.watches.add(watch);
            if (watch.immediate) {
                this.maybeBroadcastWatch(watch);
            }
            return function () {
                if (_this.watches.delete(watch) && !_this.watches.size) {
                    forgetCache(_this);
                }
                _this.maybeBroadcastWatch.forget(watch);
            };
        };
        InMemoryCache.prototype.gc = function (options) {
            canonicalStringify.reset();
            var ids = this.optimisticData.gc();
            if (options && !this.txCount) {
                if (options.resetResultCache) {
                    this.resetResultCache(options.resetResultIdentities);
                }
                else if (options.resetResultIdentities) {
                    this.storeReader.resetCanon();
                }
            }
            return ids;
        };
        InMemoryCache.prototype.retain = function (rootId, optimistic) {
            return (optimistic ? this.optimisticData : this.data).retain(rootId);
        };
        InMemoryCache.prototype.release = function (rootId, optimistic) {
            return (optimistic ? this.optimisticData : this.data).release(rootId);
        };
        InMemoryCache.prototype.identify = function (object) {
            if (isReference(object))
                return object.__ref;
            try {
                return this.policies.identify(object)[0];
            }
            catch (e) {
                __DEV__ && invariant$1.warn(e);
            }
        };
        InMemoryCache.prototype.evict = function (options) {
            if (!options.id) {
                if (hasOwn.call(options, "id")) {
                    return false;
                }
                options = __assign(__assign({}, options), { id: "ROOT_QUERY" });
            }
            try {
                ++this.txCount;
                return this.optimisticData.evict(options, this.data);
            }
            finally {
                if (!--this.txCount && options.broadcast !== false) {
                    this.broadcastWatches();
                }
            }
        };
        InMemoryCache.prototype.reset = function (options) {
            var _this = this;
            this.init();
            canonicalStringify.reset();
            if (options && options.discardWatches) {
                this.watches.forEach(function (watch) { return _this.maybeBroadcastWatch.forget(watch); });
                this.watches.clear();
                forgetCache(this);
            }
            else {
                this.broadcastWatches();
            }
            return Promise.resolve();
        };
        InMemoryCache.prototype.removeOptimistic = function (idToRemove) {
            var newOptimisticData = this.optimisticData.removeLayer(idToRemove);
            if (newOptimisticData !== this.optimisticData) {
                this.optimisticData = newOptimisticData;
                this.broadcastWatches();
            }
        };
        InMemoryCache.prototype.batch = function (options) {
            var _this = this;
            var update = options.update, _a = options.optimistic, optimistic = _a === void 0 ? true : _a, removeOptimistic = options.removeOptimistic, onWatchUpdated = options.onWatchUpdated;
            var updateResult;
            var perform = function (layer) {
                var _a = _this, data = _a.data, optimisticData = _a.optimisticData;
                ++_this.txCount;
                if (layer) {
                    _this.data = _this.optimisticData = layer;
                }
                try {
                    return updateResult = update(_this);
                }
                finally {
                    --_this.txCount;
                    _this.data = data;
                    _this.optimisticData = optimisticData;
                }
            };
            var alreadyDirty = new Set();
            if (onWatchUpdated && !this.txCount) {
                this.broadcastWatches(__assign(__assign({}, options), { onWatchUpdated: function (watch) {
                        alreadyDirty.add(watch);
                        return false;
                    } }));
            }
            if (typeof optimistic === 'string') {
                this.optimisticData = this.optimisticData.addLayer(optimistic, perform);
            }
            else if (optimistic === false) {
                perform(this.data);
            }
            else {
                perform();
            }
            if (typeof removeOptimistic === "string") {
                this.optimisticData = this.optimisticData.removeLayer(removeOptimistic);
            }
            if (onWatchUpdated && alreadyDirty.size) {
                this.broadcastWatches(__assign(__assign({}, options), { onWatchUpdated: function (watch, diff) {
                        var result = onWatchUpdated.call(this, watch, diff);
                        if (result !== false) {
                            alreadyDirty.delete(watch);
                        }
                        return result;
                    } }));
                if (alreadyDirty.size) {
                    alreadyDirty.forEach(function (watch) { return _this.maybeBroadcastWatch.dirty(watch); });
                }
            }
            else {
                this.broadcastWatches(options);
            }
            return updateResult;
        };
        InMemoryCache.prototype.performTransaction = function (update, optimisticId) {
            return this.batch({
                update: update,
                optimistic: optimisticId || (optimisticId !== null),
            });
        };
        InMemoryCache.prototype.transformDocument = function (document) {
            if (this.addTypename) {
                var result = this.typenameDocumentCache.get(document);
                if (!result) {
                    result = addTypenameToDocument(document);
                    this.typenameDocumentCache.set(document, result);
                    this.typenameDocumentCache.set(result, result);
                }
                return result;
            }
            return document;
        };
        InMemoryCache.prototype.broadcastWatches = function (options) {
            var _this = this;
            if (!this.txCount) {
                this.watches.forEach(function (c) { return _this.maybeBroadcastWatch(c, options); });
            }
        };
        InMemoryCache.prototype.broadcastWatch = function (c, options) {
            var lastDiff = c.lastDiff;
            var diff = this.diff(c);
            if (options) {
                if (c.optimistic &&
                    typeof options.optimistic === "string") {
                    diff.fromOptimisticTransaction = true;
                }
                if (options.onWatchUpdated &&
                    options.onWatchUpdated.call(this, c, diff, lastDiff) === false) {
                    return;
                }
            }
            if (!lastDiff || !equal(lastDiff.result, diff.result)) {
                c.callback(c.lastDiff = diff, lastDiff);
            }
        };
        return InMemoryCache;
    }(ApolloCache));

    function isApolloError(err) {
        return err.hasOwnProperty('graphQLErrors');
    }
    var generateErrorMessage = function (err) {
        var message = '';
        if (isNonEmptyArray(err.graphQLErrors) || isNonEmptyArray(err.clientErrors)) {
            var errors = (err.graphQLErrors || [])
                .concat(err.clientErrors || []);
            errors.forEach(function (error) {
                var errorMessage = error
                    ? error.message
                    : 'Error message not found.';
                message += "".concat(errorMessage, "\n");
            });
        }
        if (err.networkError) {
            message += "".concat(err.networkError.message, "\n");
        }
        message = message.replace(/\n$/, '');
        return message;
    };
    var ApolloError = (function (_super) {
        __extends(ApolloError, _super);
        function ApolloError(_a) {
            var graphQLErrors = _a.graphQLErrors, clientErrors = _a.clientErrors, networkError = _a.networkError, errorMessage = _a.errorMessage, extraInfo = _a.extraInfo;
            var _this = _super.call(this, errorMessage) || this;
            _this.graphQLErrors = graphQLErrors || [];
            _this.clientErrors = clientErrors || [];
            _this.networkError = networkError || null;
            _this.message = errorMessage || generateErrorMessage(_this);
            _this.extraInfo = extraInfo;
            _this.__proto__ = ApolloError.prototype;
            return _this;
        }
        return ApolloError;
    }(Error));

    var NetworkStatus;
    (function (NetworkStatus) {
        NetworkStatus[NetworkStatus["loading"] = 1] = "loading";
        NetworkStatus[NetworkStatus["setVariables"] = 2] = "setVariables";
        NetworkStatus[NetworkStatus["fetchMore"] = 3] = "fetchMore";
        NetworkStatus[NetworkStatus["refetch"] = 4] = "refetch";
        NetworkStatus[NetworkStatus["poll"] = 6] = "poll";
        NetworkStatus[NetworkStatus["ready"] = 7] = "ready";
        NetworkStatus[NetworkStatus["error"] = 8] = "error";
    })(NetworkStatus || (NetworkStatus = {}));
    function isNetworkRequestInFlight(networkStatus) {
        return networkStatus ? networkStatus < 7 : false;
    }

    var assign = Object.assign, hasOwnProperty$1 = Object.hasOwnProperty;
    var ObservableQuery = (function (_super) {
        __extends(ObservableQuery, _super);
        function ObservableQuery(_a) {
            var queryManager = _a.queryManager, queryInfo = _a.queryInfo, options = _a.options;
            var _this = _super.call(this, function (observer) {
                try {
                    var subObserver = observer._subscription._observer;
                    if (subObserver && !subObserver.error) {
                        subObserver.error = defaultSubscriptionObserverErrorCallback;
                    }
                }
                catch (_a) { }
                var first = !_this.observers.size;
                _this.observers.add(observer);
                var last = _this.last;
                if (last && last.error) {
                    observer.error && observer.error(last.error);
                }
                else if (last && last.result) {
                    observer.next && observer.next(last.result);
                }
                if (first) {
                    _this.reobserve().catch(function () { });
                }
                return function () {
                    if (_this.observers.delete(observer) && !_this.observers.size) {
                        _this.tearDownQuery();
                    }
                };
            }) || this;
            _this.observers = new Set();
            _this.subscriptions = new Set();
            _this.queryInfo = queryInfo;
            _this.queryManager = queryManager;
            _this.isTornDown = false;
            var _b = queryManager.defaultOptions.watchQuery, _c = _b === void 0 ? {} : _b, _d = _c.fetchPolicy, defaultFetchPolicy = _d === void 0 ? "cache-first" : _d;
            var _e = options.fetchPolicy, fetchPolicy = _e === void 0 ? defaultFetchPolicy : _e, _f = options.initialFetchPolicy, initialFetchPolicy = _f === void 0 ? (fetchPolicy === "standby" ? defaultFetchPolicy : fetchPolicy) : _f;
            _this.options = __assign(__assign({}, options), { initialFetchPolicy: initialFetchPolicy, fetchPolicy: fetchPolicy });
            _this.queryId = queryInfo.queryId || queryManager.generateQueryId();
            var opDef = getOperationDefinition(_this.query);
            _this.queryName = opDef && opDef.name && opDef.name.value;
            return _this;
        }
        Object.defineProperty(ObservableQuery.prototype, "query", {
            get: function () {
                return this.queryManager.transform(this.options.query).document;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ObservableQuery.prototype, "variables", {
            get: function () {
                return this.options.variables;
            },
            enumerable: false,
            configurable: true
        });
        ObservableQuery.prototype.result = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var observer = {
                    next: function (result) {
                        resolve(result);
                        _this.observers.delete(observer);
                        if (!_this.observers.size) {
                            _this.queryManager.removeQuery(_this.queryId);
                        }
                        setTimeout(function () {
                            subscription.unsubscribe();
                        }, 0);
                    },
                    error: reject,
                };
                var subscription = _this.subscribe(observer);
            });
        };
        ObservableQuery.prototype.getCurrentResult = function (saveAsLastResult) {
            if (saveAsLastResult === void 0) { saveAsLastResult = true; }
            var lastResult = this.getLastResult(true);
            var networkStatus = this.queryInfo.networkStatus ||
                (lastResult && lastResult.networkStatus) ||
                NetworkStatus.ready;
            var result = __assign(__assign({}, lastResult), { loading: isNetworkRequestInFlight(networkStatus), networkStatus: networkStatus });
            var _a = this.options.fetchPolicy, fetchPolicy = _a === void 0 ? "cache-first" : _a;
            if (fetchPolicy === 'network-only' ||
                fetchPolicy === 'no-cache' ||
                fetchPolicy === 'standby' ||
                this.queryManager.transform(this.options.query).hasForcedResolvers) ;
            else {
                var diff = this.queryInfo.getDiff();
                if (diff.complete || this.options.returnPartialData) {
                    result.data = diff.result;
                }
                if (equal(result.data, {})) {
                    result.data = void 0;
                }
                if (diff.complete) {
                    delete result.partial;
                    if (diff.complete &&
                        result.networkStatus === NetworkStatus.loading &&
                        (fetchPolicy === 'cache-first' ||
                            fetchPolicy === 'cache-only')) {
                        result.networkStatus = NetworkStatus.ready;
                        result.loading = false;
                    }
                }
                else {
                    result.partial = true;
                }
                if (__DEV__ &&
                    !diff.complete &&
                    !this.options.partialRefetch &&
                    !result.loading &&
                    !result.data &&
                    !result.error) {
                    logMissingFieldErrors(diff.missing);
                }
            }
            if (saveAsLastResult) {
                this.updateLastResult(result);
            }
            return result;
        };
        ObservableQuery.prototype.isDifferentFromLastResult = function (newResult) {
            return !this.last || !equal(this.last.result, newResult);
        };
        ObservableQuery.prototype.getLast = function (key, variablesMustMatch) {
            var last = this.last;
            if (last &&
                last[key] &&
                (!variablesMustMatch || equal(last.variables, this.variables))) {
                return last[key];
            }
        };
        ObservableQuery.prototype.getLastResult = function (variablesMustMatch) {
            return this.getLast("result", variablesMustMatch);
        };
        ObservableQuery.prototype.getLastError = function (variablesMustMatch) {
            return this.getLast("error", variablesMustMatch);
        };
        ObservableQuery.prototype.resetLastResults = function () {
            delete this.last;
            this.isTornDown = false;
        };
        ObservableQuery.prototype.resetQueryStoreErrors = function () {
            this.queryManager.resetErrors(this.queryId);
        };
        ObservableQuery.prototype.refetch = function (variables) {
            var _a;
            var reobserveOptions = {
                pollInterval: 0,
            };
            var fetchPolicy = this.options.fetchPolicy;
            if (fetchPolicy === 'cache-and-network') {
                reobserveOptions.fetchPolicy = fetchPolicy;
            }
            else if (fetchPolicy === 'no-cache') {
                reobserveOptions.fetchPolicy = 'no-cache';
            }
            else {
                reobserveOptions.fetchPolicy = 'network-only';
            }
            if (__DEV__ && variables && hasOwnProperty$1.call(variables, "variables")) {
                var queryDef = getQueryDefinition(this.query);
                var vars = queryDef.variableDefinitions;
                if (!vars || !vars.some(function (v) { return v.variable.name.value === "variables"; })) {
                    __DEV__ && invariant$1.warn("Called refetch(".concat(JSON.stringify(variables), ") for query ").concat(((_a = queryDef.name) === null || _a === void 0 ? void 0 : _a.value) || JSON.stringify(queryDef), ", which does not declare a $variables variable.\nDid you mean to call refetch(variables) instead of refetch({ variables })?"));
                }
            }
            if (variables && !equal(this.options.variables, variables)) {
                reobserveOptions.variables = this.options.variables = __assign(__assign({}, this.options.variables), variables);
            }
            this.queryInfo.resetLastWrite();
            return this.reobserve(reobserveOptions, NetworkStatus.refetch);
        };
        ObservableQuery.prototype.fetchMore = function (fetchMoreOptions) {
            var _this = this;
            var combinedOptions = __assign(__assign({}, (fetchMoreOptions.query ? fetchMoreOptions : __assign(__assign(__assign(__assign({}, this.options), { query: this.query }), fetchMoreOptions), { variables: __assign(__assign({}, this.options.variables), fetchMoreOptions.variables) }))), { fetchPolicy: "no-cache" });
            var qid = this.queryManager.generateQueryId();
            var queryInfo = this.queryInfo;
            var originalNetworkStatus = queryInfo.networkStatus;
            queryInfo.networkStatus = NetworkStatus.fetchMore;
            if (combinedOptions.notifyOnNetworkStatusChange) {
                this.observe();
            }
            var updatedQuerySet = new Set();
            return this.queryManager.fetchQuery(qid, combinedOptions, NetworkStatus.fetchMore).then(function (fetchMoreResult) {
                _this.queryManager.removeQuery(qid);
                if (queryInfo.networkStatus === NetworkStatus.fetchMore) {
                    queryInfo.networkStatus = originalNetworkStatus;
                }
                _this.queryManager.cache.batch({
                    update: function (cache) {
                        var updateQuery = fetchMoreOptions.updateQuery;
                        if (updateQuery) {
                            cache.updateQuery({
                                query: _this.query,
                                variables: _this.variables,
                                returnPartialData: true,
                                optimistic: false,
                            }, function (previous) { return updateQuery(previous, {
                                fetchMoreResult: fetchMoreResult.data,
                                variables: combinedOptions.variables,
                            }); });
                        }
                        else {
                            cache.writeQuery({
                                query: combinedOptions.query,
                                variables: combinedOptions.variables,
                                data: fetchMoreResult.data,
                            });
                        }
                    },
                    onWatchUpdated: function (watch) {
                        updatedQuerySet.add(watch.query);
                    },
                });
                return fetchMoreResult;
            }).finally(function () {
                if (!updatedQuerySet.has(_this.query)) {
                    reobserveCacheFirst(_this);
                }
            });
        };
        ObservableQuery.prototype.subscribeToMore = function (options) {
            var _this = this;
            var subscription = this.queryManager
                .startGraphQLSubscription({
                query: options.document,
                variables: options.variables,
                context: options.context,
            })
                .subscribe({
                next: function (subscriptionData) {
                    var updateQuery = options.updateQuery;
                    if (updateQuery) {
                        _this.updateQuery(function (previous, _a) {
                            var variables = _a.variables;
                            return updateQuery(previous, {
                                subscriptionData: subscriptionData,
                                variables: variables,
                            });
                        });
                    }
                },
                error: function (err) {
                    if (options.onError) {
                        options.onError(err);
                        return;
                    }
                    __DEV__ && invariant$1.error('Unhandled GraphQL subscription error', err);
                },
            });
            this.subscriptions.add(subscription);
            return function () {
                if (_this.subscriptions.delete(subscription)) {
                    subscription.unsubscribe();
                }
            };
        };
        ObservableQuery.prototype.setOptions = function (newOptions) {
            return this.reobserve(newOptions);
        };
        ObservableQuery.prototype.setVariables = function (variables) {
            if (equal(this.variables, variables)) {
                return this.observers.size
                    ? this.result()
                    : Promise.resolve();
            }
            this.options.variables = variables;
            if (!this.observers.size) {
                return Promise.resolve();
            }
            return this.reobserve({
                fetchPolicy: this.options.initialFetchPolicy,
                variables: variables,
            }, NetworkStatus.setVariables);
        };
        ObservableQuery.prototype.updateQuery = function (mapFn) {
            var queryManager = this.queryManager;
            var result = queryManager.cache.diff({
                query: this.options.query,
                variables: this.variables,
                returnPartialData: true,
                optimistic: false,
            }).result;
            var newResult = mapFn(result, {
                variables: this.variables,
            });
            if (newResult) {
                queryManager.cache.writeQuery({
                    query: this.options.query,
                    data: newResult,
                    variables: this.variables,
                });
                queryManager.broadcastQueries();
            }
        };
        ObservableQuery.prototype.startPolling = function (pollInterval) {
            this.options.pollInterval = pollInterval;
            this.updatePolling();
        };
        ObservableQuery.prototype.stopPolling = function () {
            this.options.pollInterval = 0;
            this.updatePolling();
        };
        ObservableQuery.prototype.applyNextFetchPolicy = function (reason, options) {
            if (options.nextFetchPolicy) {
                var _a = options.fetchPolicy, fetchPolicy = _a === void 0 ? "cache-first" : _a, _b = options.initialFetchPolicy, initialFetchPolicy = _b === void 0 ? fetchPolicy : _b;
                if (typeof options.nextFetchPolicy === "function") {
                    options.fetchPolicy = options.nextFetchPolicy(fetchPolicy, {
                        reason: reason,
                        options: options,
                        observable: this,
                        initialFetchPolicy: initialFetchPolicy,
                    });
                }
                else if (reason === "variables-changed") {
                    options.fetchPolicy = initialFetchPolicy;
                }
                else {
                    options.fetchPolicy = options.nextFetchPolicy;
                }
            }
            return options.fetchPolicy;
        };
        ObservableQuery.prototype.fetch = function (options, newNetworkStatus) {
            this.queryManager.setObservableQuery(this);
            return this.queryManager.fetchQueryObservable(this.queryId, options, newNetworkStatus);
        };
        ObservableQuery.prototype.updatePolling = function () {
            var _this = this;
            if (this.queryManager.ssrMode) {
                return;
            }
            var _a = this, pollingInfo = _a.pollingInfo, pollInterval = _a.options.pollInterval;
            if (!pollInterval) {
                if (pollingInfo) {
                    clearTimeout(pollingInfo.timeout);
                    delete this.pollingInfo;
                }
                return;
            }
            if (pollingInfo &&
                pollingInfo.interval === pollInterval) {
                return;
            }
            __DEV__ ? invariant$1(pollInterval, 'Attempted to start a polling query without a polling interval.') : invariant$1(pollInterval, 10);
            var info = pollingInfo || (this.pollingInfo = {});
            info.interval = pollInterval;
            var maybeFetch = function () {
                if (_this.pollingInfo) {
                    if (!isNetworkRequestInFlight(_this.queryInfo.networkStatus)) {
                        _this.reobserve({
                            fetchPolicy: "network-only",
                        }, NetworkStatus.poll).then(poll, poll);
                    }
                    else {
                        poll();
                    }
                }
            };
            var poll = function () {
                var info = _this.pollingInfo;
                if (info) {
                    clearTimeout(info.timeout);
                    info.timeout = setTimeout(maybeFetch, info.interval);
                }
            };
            poll();
        };
        ObservableQuery.prototype.updateLastResult = function (newResult, variables) {
            if (variables === void 0) { variables = this.variables; }
            this.last = __assign(__assign({}, this.last), { result: this.queryManager.assumeImmutableResults
                    ? newResult
                    : cloneDeep(newResult), variables: variables });
            if (!isNonEmptyArray(newResult.errors)) {
                delete this.last.error;
            }
            return this.last;
        };
        ObservableQuery.prototype.reobserve = function (newOptions, newNetworkStatus) {
            var _this = this;
            this.isTornDown = false;
            var useDisposableConcast = newNetworkStatus === NetworkStatus.refetch ||
                newNetworkStatus === NetworkStatus.fetchMore ||
                newNetworkStatus === NetworkStatus.poll;
            var oldVariables = this.options.variables;
            var oldFetchPolicy = this.options.fetchPolicy;
            var mergedOptions = compact(this.options, newOptions || {});
            var options = useDisposableConcast
                ? mergedOptions
                : assign(this.options, mergedOptions);
            if (!useDisposableConcast) {
                this.updatePolling();
                if (newOptions &&
                    newOptions.variables &&
                    !equal(newOptions.variables, oldVariables) &&
                    (!newOptions.fetchPolicy || newOptions.fetchPolicy === oldFetchPolicy)) {
                    this.applyNextFetchPolicy("variables-changed", options);
                    if (newNetworkStatus === void 0) {
                        newNetworkStatus = NetworkStatus.setVariables;
                    }
                }
            }
            var variables = options.variables && __assign({}, options.variables);
            var concast = this.fetch(options, newNetworkStatus);
            var observer = {
                next: function (result) {
                    _this.reportResult(result, variables);
                },
                error: function (error) {
                    _this.reportError(error, variables);
                },
            };
            if (!useDisposableConcast) {
                if (this.concast && this.observer) {
                    this.concast.removeObserver(this.observer);
                }
                this.concast = concast;
                this.observer = observer;
            }
            concast.addObserver(observer);
            return concast.promise;
        };
        ObservableQuery.prototype.observe = function () {
            this.reportResult(this.getCurrentResult(false), this.variables);
        };
        ObservableQuery.prototype.reportResult = function (result, variables) {
            var lastError = this.getLastError();
            if (lastError || this.isDifferentFromLastResult(result)) {
                if (lastError || !result.partial || this.options.returnPartialData) {
                    this.updateLastResult(result, variables);
                }
                iterateObserversSafely(this.observers, 'next', result);
            }
        };
        ObservableQuery.prototype.reportError = function (error, variables) {
            var errorResult = __assign(__assign({}, this.getLastResult()), { error: error, errors: error.graphQLErrors, networkStatus: NetworkStatus.error, loading: false });
            this.updateLastResult(errorResult, variables);
            iterateObserversSafely(this.observers, 'error', this.last.error = error);
        };
        ObservableQuery.prototype.hasObservers = function () {
            return this.observers.size > 0;
        };
        ObservableQuery.prototype.tearDownQuery = function () {
            if (this.isTornDown)
                return;
            if (this.concast && this.observer) {
                this.concast.removeObserver(this.observer);
                delete this.concast;
                delete this.observer;
            }
            this.stopPolling();
            this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
            this.subscriptions.clear();
            this.queryManager.stopQuery(this.queryId);
            this.observers.clear();
            this.isTornDown = true;
        };
        return ObservableQuery;
    }(Observable));
    fixObservableSubclass(ObservableQuery);
    function reobserveCacheFirst(obsQuery) {
        var _a = obsQuery.options, fetchPolicy = _a.fetchPolicy, nextFetchPolicy = _a.nextFetchPolicy;
        if (fetchPolicy === "cache-and-network" ||
            fetchPolicy === "network-only") {
            return obsQuery.reobserve({
                fetchPolicy: "cache-first",
                nextFetchPolicy: function () {
                    this.nextFetchPolicy = nextFetchPolicy;
                    if (typeof nextFetchPolicy === "function") {
                        return nextFetchPolicy.apply(this, arguments);
                    }
                    return fetchPolicy;
                },
            });
        }
        return obsQuery.reobserve();
    }
    function defaultSubscriptionObserverErrorCallback(error) {
        __DEV__ && invariant$1.error('Unhandled error', error.message, error.stack);
    }
    function logMissingFieldErrors(missing) {
        if (__DEV__ && missing) {
            __DEV__ && invariant$1.debug("Missing cache result fields: ".concat(JSON.stringify(missing)), missing);
        }
    }

    var LocalState = (function () {
        function LocalState(_a) {
            var cache = _a.cache, client = _a.client, resolvers = _a.resolvers, fragmentMatcher = _a.fragmentMatcher;
            this.cache = cache;
            if (client) {
                this.client = client;
            }
            if (resolvers) {
                this.addResolvers(resolvers);
            }
            if (fragmentMatcher) {
                this.setFragmentMatcher(fragmentMatcher);
            }
        }
        LocalState.prototype.addResolvers = function (resolvers) {
            var _this = this;
            this.resolvers = this.resolvers || {};
            if (Array.isArray(resolvers)) {
                resolvers.forEach(function (resolverGroup) {
                    _this.resolvers = mergeDeep(_this.resolvers, resolverGroup);
                });
            }
            else {
                this.resolvers = mergeDeep(this.resolvers, resolvers);
            }
        };
        LocalState.prototype.setResolvers = function (resolvers) {
            this.resolvers = {};
            this.addResolvers(resolvers);
        };
        LocalState.prototype.getResolvers = function () {
            return this.resolvers || {};
        };
        LocalState.prototype.runResolvers = function (_a) {
            var document = _a.document, remoteResult = _a.remoteResult, context = _a.context, variables = _a.variables, _b = _a.onlyRunForcedResolvers, onlyRunForcedResolvers = _b === void 0 ? false : _b;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    if (document) {
                        return [2, this.resolveDocument(document, remoteResult.data, context, variables, this.fragmentMatcher, onlyRunForcedResolvers).then(function (localResult) { return (__assign(__assign({}, remoteResult), { data: localResult.result })); })];
                    }
                    return [2, remoteResult];
                });
            });
        };
        LocalState.prototype.setFragmentMatcher = function (fragmentMatcher) {
            this.fragmentMatcher = fragmentMatcher;
        };
        LocalState.prototype.getFragmentMatcher = function () {
            return this.fragmentMatcher;
        };
        LocalState.prototype.clientQuery = function (document) {
            if (hasDirectives(['client'], document)) {
                if (this.resolvers) {
                    return document;
                }
            }
            return null;
        };
        LocalState.prototype.serverQuery = function (document) {
            return removeClientSetsFromDocument(document);
        };
        LocalState.prototype.prepareContext = function (context) {
            var cache = this.cache;
            return __assign(__assign({}, context), { cache: cache, getCacheKey: function (obj) {
                    return cache.identify(obj);
                } });
        };
        LocalState.prototype.addExportedVariables = function (document, variables, context) {
            if (variables === void 0) { variables = {}; }
            if (context === void 0) { context = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (document) {
                        return [2, this.resolveDocument(document, this.buildRootValueFromCache(document, variables) || {}, this.prepareContext(context), variables).then(function (data) { return (__assign(__assign({}, variables), data.exportedVariables)); })];
                    }
                    return [2, __assign({}, variables)];
                });
            });
        };
        LocalState.prototype.shouldForceResolvers = function (document) {
            var forceResolvers = false;
            visit(document, {
                Directive: {
                    enter: function (node) {
                        if (node.name.value === 'client' && node.arguments) {
                            forceResolvers = node.arguments.some(function (arg) {
                                return arg.name.value === 'always' &&
                                    arg.value.kind === 'BooleanValue' &&
                                    arg.value.value === true;
                            });
                            if (forceResolvers) {
                                return BREAK;
                            }
                        }
                    },
                },
            });
            return forceResolvers;
        };
        LocalState.prototype.buildRootValueFromCache = function (document, variables) {
            return this.cache.diff({
                query: buildQueryFromSelectionSet(document),
                variables: variables,
                returnPartialData: true,
                optimistic: false,
            }).result;
        };
        LocalState.prototype.resolveDocument = function (document, rootValue, context, variables, fragmentMatcher, onlyRunForcedResolvers) {
            if (context === void 0) { context = {}; }
            if (variables === void 0) { variables = {}; }
            if (fragmentMatcher === void 0) { fragmentMatcher = function () { return true; }; }
            if (onlyRunForcedResolvers === void 0) { onlyRunForcedResolvers = false; }
            return __awaiter(this, void 0, void 0, function () {
                var mainDefinition, fragments, fragmentMap, definitionOperation, defaultOperationType, _a, cache, client, execContext;
                return __generator(this, function (_b) {
                    mainDefinition = getMainDefinition(document);
                    fragments = getFragmentDefinitions(document);
                    fragmentMap = createFragmentMap(fragments);
                    definitionOperation = mainDefinition
                        .operation;
                    defaultOperationType = definitionOperation
                        ? definitionOperation.charAt(0).toUpperCase() +
                            definitionOperation.slice(1)
                        : 'Query';
                    _a = this, cache = _a.cache, client = _a.client;
                    execContext = {
                        fragmentMap: fragmentMap,
                        context: __assign(__assign({}, context), { cache: cache, client: client }),
                        variables: variables,
                        fragmentMatcher: fragmentMatcher,
                        defaultOperationType: defaultOperationType,
                        exportedVariables: {},
                        onlyRunForcedResolvers: onlyRunForcedResolvers,
                    };
                    return [2, this.resolveSelectionSet(mainDefinition.selectionSet, rootValue, execContext).then(function (result) { return ({
                            result: result,
                            exportedVariables: execContext.exportedVariables,
                        }); })];
                });
            });
        };
        LocalState.prototype.resolveSelectionSet = function (selectionSet, rootValue, execContext) {
            return __awaiter(this, void 0, void 0, function () {
                var fragmentMap, context, variables, resultsToMerge, execute;
                var _this = this;
                return __generator(this, function (_a) {
                    fragmentMap = execContext.fragmentMap, context = execContext.context, variables = execContext.variables;
                    resultsToMerge = [rootValue];
                    execute = function (selection) { return __awaiter(_this, void 0, void 0, function () {
                        var fragment, typeCondition;
                        return __generator(this, function (_a) {
                            if (!shouldInclude(selection, variables)) {
                                return [2];
                            }
                            if (isField(selection)) {
                                return [2, this.resolveField(selection, rootValue, execContext).then(function (fieldResult) {
                                        var _a;
                                        if (typeof fieldResult !== 'undefined') {
                                            resultsToMerge.push((_a = {},
                                                _a[resultKeyNameFromField(selection)] = fieldResult,
                                                _a));
                                        }
                                    })];
                            }
                            if (isInlineFragment(selection)) {
                                fragment = selection;
                            }
                            else {
                                fragment = fragmentMap[selection.name.value];
                                __DEV__ ? invariant$1(fragment, "No fragment named ".concat(selection.name.value)) : invariant$1(fragment, 9);
                            }
                            if (fragment && fragment.typeCondition) {
                                typeCondition = fragment.typeCondition.name.value;
                                if (execContext.fragmentMatcher(rootValue, typeCondition, context)) {
                                    return [2, this.resolveSelectionSet(fragment.selectionSet, rootValue, execContext).then(function (fragmentResult) {
                                            resultsToMerge.push(fragmentResult);
                                        })];
                                }
                            }
                            return [2];
                        });
                    }); };
                    return [2, Promise.all(selectionSet.selections.map(execute)).then(function () {
                            return mergeDeepArray(resultsToMerge);
                        })];
                });
            });
        };
        LocalState.prototype.resolveField = function (field, rootValue, execContext) {
            return __awaiter(this, void 0, void 0, function () {
                var variables, fieldName, aliasedFieldName, aliasUsed, defaultResult, resultPromise, resolverType, resolverMap, resolve;
                var _this = this;
                return __generator(this, function (_a) {
                    variables = execContext.variables;
                    fieldName = field.name.value;
                    aliasedFieldName = resultKeyNameFromField(field);
                    aliasUsed = fieldName !== aliasedFieldName;
                    defaultResult = rootValue[aliasedFieldName] || rootValue[fieldName];
                    resultPromise = Promise.resolve(defaultResult);
                    if (!execContext.onlyRunForcedResolvers ||
                        this.shouldForceResolvers(field)) {
                        resolverType = rootValue.__typename || execContext.defaultOperationType;
                        resolverMap = this.resolvers && this.resolvers[resolverType];
                        if (resolverMap) {
                            resolve = resolverMap[aliasUsed ? fieldName : aliasedFieldName];
                            if (resolve) {
                                resultPromise = Promise.resolve(cacheSlot.withValue(this.cache, resolve, [
                                    rootValue,
                                    argumentsObjectFromField(field, variables),
                                    execContext.context,
                                    { field: field, fragmentMap: execContext.fragmentMap },
                                ]));
                            }
                        }
                    }
                    return [2, resultPromise.then(function (result) {
                            if (result === void 0) { result = defaultResult; }
                            if (field.directives) {
                                field.directives.forEach(function (directive) {
                                    if (directive.name.value === 'export' && directive.arguments) {
                                        directive.arguments.forEach(function (arg) {
                                            if (arg.name.value === 'as' && arg.value.kind === 'StringValue') {
                                                execContext.exportedVariables[arg.value.value] = result;
                                            }
                                        });
                                    }
                                });
                            }
                            if (!field.selectionSet) {
                                return result;
                            }
                            if (result == null) {
                                return result;
                            }
                            if (Array.isArray(result)) {
                                return _this.resolveSubSelectedArray(field, result, execContext);
                            }
                            if (field.selectionSet) {
                                return _this.resolveSelectionSet(field.selectionSet, result, execContext);
                            }
                        })];
                });
            });
        };
        LocalState.prototype.resolveSubSelectedArray = function (field, result, execContext) {
            var _this = this;
            return Promise.all(result.map(function (item) {
                if (item === null) {
                    return null;
                }
                if (Array.isArray(item)) {
                    return _this.resolveSubSelectedArray(field, item, execContext);
                }
                if (field.selectionSet) {
                    return _this.resolveSelectionSet(field.selectionSet, item, execContext);
                }
            }));
        };
        return LocalState;
    }());

    var destructiveMethodCounts = new (canUseWeakMap ? WeakMap : Map)();
    function wrapDestructiveCacheMethod(cache, methodName) {
        var original = cache[methodName];
        if (typeof original === "function") {
            cache[methodName] = function () {
                destructiveMethodCounts.set(cache, (destructiveMethodCounts.get(cache) + 1) % 1e15);
                return original.apply(this, arguments);
            };
        }
    }
    function cancelNotifyTimeout(info) {
        if (info["notifyTimeout"]) {
            clearTimeout(info["notifyTimeout"]);
            info["notifyTimeout"] = void 0;
        }
    }
    var QueryInfo = (function () {
        function QueryInfo(queryManager, queryId) {
            if (queryId === void 0) { queryId = queryManager.generateQueryId(); }
            this.queryId = queryId;
            this.listeners = new Set();
            this.document = null;
            this.lastRequestId = 1;
            this.subscriptions = new Set();
            this.stopped = false;
            this.dirty = false;
            this.observableQuery = null;
            var cache = this.cache = queryManager.cache;
            if (!destructiveMethodCounts.has(cache)) {
                destructiveMethodCounts.set(cache, 0);
                wrapDestructiveCacheMethod(cache, "evict");
                wrapDestructiveCacheMethod(cache, "modify");
                wrapDestructiveCacheMethod(cache, "reset");
            }
        }
        QueryInfo.prototype.init = function (query) {
            var networkStatus = query.networkStatus || NetworkStatus.loading;
            if (this.variables &&
                this.networkStatus !== NetworkStatus.loading &&
                !equal(this.variables, query.variables)) {
                networkStatus = NetworkStatus.setVariables;
            }
            if (!equal(query.variables, this.variables)) {
                this.lastDiff = void 0;
            }
            Object.assign(this, {
                document: query.document,
                variables: query.variables,
                networkError: null,
                graphQLErrors: this.graphQLErrors || [],
                networkStatus: networkStatus,
            });
            if (query.observableQuery) {
                this.setObservableQuery(query.observableQuery);
            }
            if (query.lastRequestId) {
                this.lastRequestId = query.lastRequestId;
            }
            return this;
        };
        QueryInfo.prototype.reset = function () {
            cancelNotifyTimeout(this);
            this.lastDiff = void 0;
            this.dirty = false;
        };
        QueryInfo.prototype.getDiff = function (variables) {
            if (variables === void 0) { variables = this.variables; }
            var options = this.getDiffOptions(variables);
            if (this.lastDiff && equal(options, this.lastDiff.options)) {
                return this.lastDiff.diff;
            }
            this.updateWatch(this.variables = variables);
            var oq = this.observableQuery;
            if (oq && oq.options.fetchPolicy === "no-cache") {
                return { complete: false };
            }
            var diff = this.cache.diff(options);
            this.updateLastDiff(diff, options);
            return diff;
        };
        QueryInfo.prototype.updateLastDiff = function (diff, options) {
            this.lastDiff = diff ? {
                diff: diff,
                options: options || this.getDiffOptions(),
            } : void 0;
        };
        QueryInfo.prototype.getDiffOptions = function (variables) {
            var _a;
            if (variables === void 0) { variables = this.variables; }
            return {
                query: this.document,
                variables: variables,
                returnPartialData: true,
                optimistic: true,
                canonizeResults: (_a = this.observableQuery) === null || _a === void 0 ? void 0 : _a.options.canonizeResults,
            };
        };
        QueryInfo.prototype.setDiff = function (diff) {
            var _this = this;
            var oldDiff = this.lastDiff && this.lastDiff.diff;
            this.updateLastDiff(diff);
            if (!this.dirty &&
                !equal(oldDiff && oldDiff.result, diff && diff.result)) {
                this.dirty = true;
                if (!this.notifyTimeout) {
                    this.notifyTimeout = setTimeout(function () { return _this.notify(); }, 0);
                }
            }
        };
        QueryInfo.prototype.setObservableQuery = function (oq) {
            var _this = this;
            if (oq === this.observableQuery)
                return;
            if (this.oqListener) {
                this.listeners.delete(this.oqListener);
            }
            this.observableQuery = oq;
            if (oq) {
                oq["queryInfo"] = this;
                this.listeners.add(this.oqListener = function () {
                    var diff = _this.getDiff();
                    if (diff.fromOptimisticTransaction) {
                        oq["observe"]();
                    }
                    else {
                        reobserveCacheFirst(oq);
                    }
                });
            }
            else {
                delete this.oqListener;
            }
        };
        QueryInfo.prototype.notify = function () {
            var _this = this;
            cancelNotifyTimeout(this);
            if (this.shouldNotify()) {
                this.listeners.forEach(function (listener) { return listener(_this); });
            }
            this.dirty = false;
        };
        QueryInfo.prototype.shouldNotify = function () {
            if (!this.dirty || !this.listeners.size) {
                return false;
            }
            if (isNetworkRequestInFlight(this.networkStatus) &&
                this.observableQuery) {
                var fetchPolicy = this.observableQuery.options.fetchPolicy;
                if (fetchPolicy !== "cache-only" &&
                    fetchPolicy !== "cache-and-network") {
                    return false;
                }
            }
            return true;
        };
        QueryInfo.prototype.stop = function () {
            if (!this.stopped) {
                this.stopped = true;
                this.reset();
                this.cancel();
                this.cancel = QueryInfo.prototype.cancel;
                this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
                var oq = this.observableQuery;
                if (oq)
                    oq.stopPolling();
            }
        };
        QueryInfo.prototype.cancel = function () { };
        QueryInfo.prototype.updateWatch = function (variables) {
            var _this = this;
            if (variables === void 0) { variables = this.variables; }
            var oq = this.observableQuery;
            if (oq && oq.options.fetchPolicy === "no-cache") {
                return;
            }
            var watchOptions = __assign(__assign({}, this.getDiffOptions(variables)), { watcher: this, callback: function (diff) { return _this.setDiff(diff); } });
            if (!this.lastWatch ||
                !equal(watchOptions, this.lastWatch)) {
                this.cancel();
                this.cancel = this.cache.watch(this.lastWatch = watchOptions);
            }
        };
        QueryInfo.prototype.resetLastWrite = function () {
            this.lastWrite = void 0;
        };
        QueryInfo.prototype.shouldWrite = function (result, variables) {
            var lastWrite = this.lastWrite;
            return !(lastWrite &&
                lastWrite.dmCount === destructiveMethodCounts.get(this.cache) &&
                equal(variables, lastWrite.variables) &&
                equal(result.data, lastWrite.result.data));
        };
        QueryInfo.prototype.markResult = function (result, options, cacheWriteBehavior) {
            var _this = this;
            this.graphQLErrors = isNonEmptyArray(result.errors) ? result.errors : [];
            this.reset();
            if (options.fetchPolicy === 'no-cache') {
                this.updateLastDiff({ result: result.data, complete: true }, this.getDiffOptions(options.variables));
            }
            else if (cacheWriteBehavior !== 0) {
                if (shouldWriteResult(result, options.errorPolicy)) {
                    this.cache.performTransaction(function (cache) {
                        if (_this.shouldWrite(result, options.variables)) {
                            cache.writeQuery({
                                query: _this.document,
                                data: result.data,
                                variables: options.variables,
                                overwrite: cacheWriteBehavior === 1,
                            });
                            _this.lastWrite = {
                                result: result,
                                variables: options.variables,
                                dmCount: destructiveMethodCounts.get(_this.cache),
                            };
                        }
                        else {
                            if (_this.lastDiff &&
                                _this.lastDiff.diff.complete) {
                                result.data = _this.lastDiff.diff.result;
                                return;
                            }
                        }
                        var diffOptions = _this.getDiffOptions(options.variables);
                        var diff = cache.diff(diffOptions);
                        if (!_this.stopped) {
                            _this.updateWatch(options.variables);
                        }
                        _this.updateLastDiff(diff, diffOptions);
                        if (diff.complete) {
                            result.data = diff.result;
                        }
                    });
                }
                else {
                    this.lastWrite = void 0;
                }
            }
        };
        QueryInfo.prototype.markReady = function () {
            this.networkError = null;
            return this.networkStatus = NetworkStatus.ready;
        };
        QueryInfo.prototype.markError = function (error) {
            this.networkStatus = NetworkStatus.error;
            this.lastWrite = void 0;
            this.reset();
            if (error.graphQLErrors) {
                this.graphQLErrors = error.graphQLErrors;
            }
            if (error.networkError) {
                this.networkError = error.networkError;
            }
            return error;
        };
        return QueryInfo;
    }());
    function shouldWriteResult(result, errorPolicy) {
        if (errorPolicy === void 0) { errorPolicy = "none"; }
        var ignoreErrors = errorPolicy === "ignore" ||
            errorPolicy === "all";
        var writeWithErrors = !graphQLResultHasError(result);
        if (!writeWithErrors && ignoreErrors && result.data) {
            writeWithErrors = true;
        }
        return writeWithErrors;
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var QueryManager = (function () {
        function QueryManager(_a) {
            var cache = _a.cache, link = _a.link, defaultOptions = _a.defaultOptions, _b = _a.queryDeduplication, queryDeduplication = _b === void 0 ? false : _b, onBroadcast = _a.onBroadcast, _c = _a.ssrMode, ssrMode = _c === void 0 ? false : _c, _d = _a.clientAwareness, clientAwareness = _d === void 0 ? {} : _d, localState = _a.localState, assumeImmutableResults = _a.assumeImmutableResults;
            this.clientAwareness = {};
            this.queries = new Map();
            this.fetchCancelFns = new Map();
            this.transformCache = new (canUseWeakMap ? WeakMap : Map)();
            this.queryIdCounter = 1;
            this.requestIdCounter = 1;
            this.mutationIdCounter = 1;
            this.inFlightLinkObservables = new Map();
            this.cache = cache;
            this.link = link;
            this.defaultOptions = defaultOptions || Object.create(null);
            this.queryDeduplication = queryDeduplication;
            this.clientAwareness = clientAwareness;
            this.localState = localState || new LocalState({ cache: cache });
            this.ssrMode = ssrMode;
            this.assumeImmutableResults = !!assumeImmutableResults;
            if ((this.onBroadcast = onBroadcast)) {
                this.mutationStore = Object.create(null);
            }
        }
        QueryManager.prototype.stop = function () {
            var _this = this;
            this.queries.forEach(function (_info, queryId) {
                _this.stopQueryNoBroadcast(queryId);
            });
            this.cancelPendingFetches(__DEV__ ? new InvariantError('QueryManager stopped while query was in flight') : new InvariantError(11));
        };
        QueryManager.prototype.cancelPendingFetches = function (error) {
            this.fetchCancelFns.forEach(function (cancel) { return cancel(error); });
            this.fetchCancelFns.clear();
        };
        QueryManager.prototype.mutate = function (_a) {
            var _b, _c;
            var mutation = _a.mutation, variables = _a.variables, optimisticResponse = _a.optimisticResponse, updateQueries = _a.updateQueries, _d = _a.refetchQueries, refetchQueries = _d === void 0 ? [] : _d, _e = _a.awaitRefetchQueries, awaitRefetchQueries = _e === void 0 ? false : _e, updateWithProxyFn = _a.update, onQueryUpdated = _a.onQueryUpdated, _f = _a.fetchPolicy, fetchPolicy = _f === void 0 ? ((_b = this.defaultOptions.mutate) === null || _b === void 0 ? void 0 : _b.fetchPolicy) || "network-only" : _f, _g = _a.errorPolicy, errorPolicy = _g === void 0 ? ((_c = this.defaultOptions.mutate) === null || _c === void 0 ? void 0 : _c.errorPolicy) || "none" : _g, keepRootFields = _a.keepRootFields, context = _a.context;
            return __awaiter(this, void 0, void 0, function () {
                var mutationId, mutationStoreValue, self;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            __DEV__ ? invariant$1(mutation, 'mutation option is required. You must specify your GraphQL document in the mutation option.') : invariant$1(mutation, 12);
                            __DEV__ ? invariant$1(fetchPolicy === 'network-only' ||
                                fetchPolicy === 'no-cache', "Mutations support only 'network-only' or 'no-cache' fetchPolicy strings. The default `network-only` behavior automatically writes mutation results to the cache. Passing `no-cache` skips the cache write.") : invariant$1(fetchPolicy === 'network-only' ||
                                fetchPolicy === 'no-cache', 13);
                            mutationId = this.generateMutationId();
                            mutation = this.transform(mutation).document;
                            variables = this.getVariables(mutation, variables);
                            if (!this.transform(mutation).hasClientExports) return [3, 2];
                            return [4, this.localState.addExportedVariables(mutation, variables, context)];
                        case 1:
                            variables = (_h.sent());
                            _h.label = 2;
                        case 2:
                            mutationStoreValue = this.mutationStore &&
                                (this.mutationStore[mutationId] = {
                                    mutation: mutation,
                                    variables: variables,
                                    loading: true,
                                    error: null,
                                });
                            if (optimisticResponse) {
                                this.markMutationOptimistic(optimisticResponse, {
                                    mutationId: mutationId,
                                    document: mutation,
                                    variables: variables,
                                    fetchPolicy: fetchPolicy,
                                    errorPolicy: errorPolicy,
                                    context: context,
                                    updateQueries: updateQueries,
                                    update: updateWithProxyFn,
                                    keepRootFields: keepRootFields,
                                });
                            }
                            this.broadcastQueries();
                            self = this;
                            return [2, new Promise(function (resolve, reject) {
                                    return asyncMap(self.getObservableFromLink(mutation, __assign(__assign({}, context), { optimisticResponse: optimisticResponse }), variables, false), function (result) {
                                        if (graphQLResultHasError(result) && errorPolicy === 'none') {
                                            throw new ApolloError({
                                                graphQLErrors: result.errors,
                                            });
                                        }
                                        if (mutationStoreValue) {
                                            mutationStoreValue.loading = false;
                                            mutationStoreValue.error = null;
                                        }
                                        var storeResult = __assign({}, result);
                                        if (typeof refetchQueries === "function") {
                                            refetchQueries = refetchQueries(storeResult);
                                        }
                                        if (errorPolicy === 'ignore' &&
                                            graphQLResultHasError(storeResult)) {
                                            delete storeResult.errors;
                                        }
                                        return self.markMutationResult({
                                            mutationId: mutationId,
                                            result: storeResult,
                                            document: mutation,
                                            variables: variables,
                                            fetchPolicy: fetchPolicy,
                                            errorPolicy: errorPolicy,
                                            context: context,
                                            update: updateWithProxyFn,
                                            updateQueries: updateQueries,
                                            awaitRefetchQueries: awaitRefetchQueries,
                                            refetchQueries: refetchQueries,
                                            removeOptimistic: optimisticResponse ? mutationId : void 0,
                                            onQueryUpdated: onQueryUpdated,
                                            keepRootFields: keepRootFields,
                                        });
                                    }).subscribe({
                                        next: function (storeResult) {
                                            self.broadcastQueries();
                                            resolve(storeResult);
                                        },
                                        error: function (err) {
                                            if (mutationStoreValue) {
                                                mutationStoreValue.loading = false;
                                                mutationStoreValue.error = err;
                                            }
                                            if (optimisticResponse) {
                                                self.cache.removeOptimistic(mutationId);
                                            }
                                            self.broadcastQueries();
                                            reject(err instanceof ApolloError ? err : new ApolloError({
                                                networkError: err,
                                            }));
                                        },
                                    });
                                })];
                    }
                });
            });
        };
        QueryManager.prototype.markMutationResult = function (mutation, cache) {
            var _this = this;
            if (cache === void 0) { cache = this.cache; }
            var result = mutation.result;
            var cacheWrites = [];
            var skipCache = mutation.fetchPolicy === "no-cache";
            if (!skipCache && shouldWriteResult(result, mutation.errorPolicy)) {
                cacheWrites.push({
                    result: result.data,
                    dataId: 'ROOT_MUTATION',
                    query: mutation.document,
                    variables: mutation.variables,
                });
                var updateQueries_1 = mutation.updateQueries;
                if (updateQueries_1) {
                    this.queries.forEach(function (_a, queryId) {
                        var observableQuery = _a.observableQuery;
                        var queryName = observableQuery && observableQuery.queryName;
                        if (!queryName || !hasOwnProperty.call(updateQueries_1, queryName)) {
                            return;
                        }
                        var updater = updateQueries_1[queryName];
                        var _b = _this.queries.get(queryId), document = _b.document, variables = _b.variables;
                        var _c = cache.diff({
                            query: document,
                            variables: variables,
                            returnPartialData: true,
                            optimistic: false,
                        }), currentQueryResult = _c.result, complete = _c.complete;
                        if (complete && currentQueryResult) {
                            var nextQueryResult = updater(currentQueryResult, {
                                mutationResult: result,
                                queryName: document && getOperationName(document) || void 0,
                                queryVariables: variables,
                            });
                            if (nextQueryResult) {
                                cacheWrites.push({
                                    result: nextQueryResult,
                                    dataId: 'ROOT_QUERY',
                                    query: document,
                                    variables: variables,
                                });
                            }
                        }
                    });
                }
            }
            if (cacheWrites.length > 0 ||
                mutation.refetchQueries ||
                mutation.update ||
                mutation.onQueryUpdated ||
                mutation.removeOptimistic) {
                var results_1 = [];
                this.refetchQueries({
                    updateCache: function (cache) {
                        if (!skipCache) {
                            cacheWrites.forEach(function (write) { return cache.write(write); });
                        }
                        var update = mutation.update;
                        if (update) {
                            if (!skipCache) {
                                var diff = cache.diff({
                                    id: "ROOT_MUTATION",
                                    query: _this.transform(mutation.document).asQuery,
                                    variables: mutation.variables,
                                    optimistic: false,
                                    returnPartialData: true,
                                });
                                if (diff.complete) {
                                    result = __assign(__assign({}, result), { data: diff.result });
                                }
                            }
                            update(cache, result, {
                                context: mutation.context,
                                variables: mutation.variables,
                            });
                        }
                        if (!skipCache && !mutation.keepRootFields) {
                            cache.modify({
                                id: 'ROOT_MUTATION',
                                fields: function (value, _a) {
                                    var fieldName = _a.fieldName, DELETE = _a.DELETE;
                                    return fieldName === "__typename" ? value : DELETE;
                                },
                            });
                        }
                    },
                    include: mutation.refetchQueries,
                    optimistic: false,
                    removeOptimistic: mutation.removeOptimistic,
                    onQueryUpdated: mutation.onQueryUpdated || null,
                }).forEach(function (result) { return results_1.push(result); });
                if (mutation.awaitRefetchQueries || mutation.onQueryUpdated) {
                    return Promise.all(results_1).then(function () { return result; });
                }
            }
            return Promise.resolve(result);
        };
        QueryManager.prototype.markMutationOptimistic = function (optimisticResponse, mutation) {
            var _this = this;
            var data = typeof optimisticResponse === "function"
                ? optimisticResponse(mutation.variables)
                : optimisticResponse;
            return this.cache.recordOptimisticTransaction(function (cache) {
                try {
                    _this.markMutationResult(__assign(__assign({}, mutation), { result: { data: data } }), cache);
                }
                catch (error) {
                    __DEV__ && invariant$1.error(error);
                }
            }, mutation.mutationId);
        };
        QueryManager.prototype.fetchQuery = function (queryId, options, networkStatus) {
            return this.fetchQueryObservable(queryId, options, networkStatus).promise;
        };
        QueryManager.prototype.getQueryStore = function () {
            var store = Object.create(null);
            this.queries.forEach(function (info, queryId) {
                store[queryId] = {
                    variables: info.variables,
                    networkStatus: info.networkStatus,
                    networkError: info.networkError,
                    graphQLErrors: info.graphQLErrors,
                };
            });
            return store;
        };
        QueryManager.prototype.resetErrors = function (queryId) {
            var queryInfo = this.queries.get(queryId);
            if (queryInfo) {
                queryInfo.networkError = undefined;
                queryInfo.graphQLErrors = [];
            }
        };
        QueryManager.prototype.transform = function (document) {
            var transformCache = this.transformCache;
            if (!transformCache.has(document)) {
                var transformed = this.cache.transformDocument(document);
                var forLink = removeConnectionDirectiveFromDocument(this.cache.transformForLink(transformed));
                var clientQuery = this.localState.clientQuery(transformed);
                var serverQuery = forLink && this.localState.serverQuery(forLink);
                var cacheEntry_1 = {
                    document: transformed,
                    hasClientExports: hasClientExports(transformed),
                    hasForcedResolvers: this.localState.shouldForceResolvers(transformed),
                    clientQuery: clientQuery,
                    serverQuery: serverQuery,
                    defaultVars: getDefaultValues(getOperationDefinition(transformed)),
                    asQuery: __assign(__assign({}, transformed), { definitions: transformed.definitions.map(function (def) {
                            if (def.kind === "OperationDefinition" &&
                                def.operation !== "query") {
                                return __assign(__assign({}, def), { operation: "query" });
                            }
                            return def;
                        }) })
                };
                var add = function (doc) {
                    if (doc && !transformCache.has(doc)) {
                        transformCache.set(doc, cacheEntry_1);
                    }
                };
                add(document);
                add(transformed);
                add(clientQuery);
                add(serverQuery);
            }
            return transformCache.get(document);
        };
        QueryManager.prototype.getVariables = function (document, variables) {
            return __assign(__assign({}, this.transform(document).defaultVars), variables);
        };
        QueryManager.prototype.watchQuery = function (options) {
            options = __assign(__assign({}, options), { variables: this.getVariables(options.query, options.variables) });
            if (typeof options.notifyOnNetworkStatusChange === 'undefined') {
                options.notifyOnNetworkStatusChange = false;
            }
            var queryInfo = new QueryInfo(this);
            var observable = new ObservableQuery({
                queryManager: this,
                queryInfo: queryInfo,
                options: options,
            });
            this.queries.set(observable.queryId, queryInfo);
            queryInfo.init({
                document: observable.query,
                observableQuery: observable,
                variables: observable.variables,
            });
            return observable;
        };
        QueryManager.prototype.query = function (options, queryId) {
            var _this = this;
            if (queryId === void 0) { queryId = this.generateQueryId(); }
            __DEV__ ? invariant$1(options.query, 'query option is required. You must specify your GraphQL document ' +
                'in the query option.') : invariant$1(options.query, 14);
            __DEV__ ? invariant$1(options.query.kind === 'Document', 'You must wrap the query string in a "gql" tag.') : invariant$1(options.query.kind === 'Document', 15);
            __DEV__ ? invariant$1(!options.returnPartialData, 'returnPartialData option only supported on watchQuery.') : invariant$1(!options.returnPartialData, 16);
            __DEV__ ? invariant$1(!options.pollInterval, 'pollInterval option only supported on watchQuery.') : invariant$1(!options.pollInterval, 17);
            return this.fetchQuery(queryId, options).finally(function () { return _this.stopQuery(queryId); });
        };
        QueryManager.prototype.generateQueryId = function () {
            return String(this.queryIdCounter++);
        };
        QueryManager.prototype.generateRequestId = function () {
            return this.requestIdCounter++;
        };
        QueryManager.prototype.generateMutationId = function () {
            return String(this.mutationIdCounter++);
        };
        QueryManager.prototype.stopQueryInStore = function (queryId) {
            this.stopQueryInStoreNoBroadcast(queryId);
            this.broadcastQueries();
        };
        QueryManager.prototype.stopQueryInStoreNoBroadcast = function (queryId) {
            var queryInfo = this.queries.get(queryId);
            if (queryInfo)
                queryInfo.stop();
        };
        QueryManager.prototype.clearStore = function (options) {
            if (options === void 0) { options = {
                discardWatches: true,
            }; }
            this.cancelPendingFetches(__DEV__ ? new InvariantError('Store reset while query was in flight (not completed in link chain)') : new InvariantError(18));
            this.queries.forEach(function (queryInfo) {
                if (queryInfo.observableQuery) {
                    queryInfo.networkStatus = NetworkStatus.loading;
                }
                else {
                    queryInfo.stop();
                }
            });
            if (this.mutationStore) {
                this.mutationStore = Object.create(null);
            }
            return this.cache.reset(options);
        };
        QueryManager.prototype.getObservableQueries = function (include) {
            var _this = this;
            if (include === void 0) { include = "active"; }
            var queries = new Map();
            var queryNamesAndDocs = new Map();
            var legacyQueryOptions = new Set();
            if (Array.isArray(include)) {
                include.forEach(function (desc) {
                    if (typeof desc === "string") {
                        queryNamesAndDocs.set(desc, false);
                    }
                    else if (isDocumentNode(desc)) {
                        queryNamesAndDocs.set(_this.transform(desc).document, false);
                    }
                    else if (isNonNullObject(desc) && desc.query) {
                        legacyQueryOptions.add(desc);
                    }
                });
            }
            this.queries.forEach(function (_a, queryId) {
                var oq = _a.observableQuery, document = _a.document;
                if (oq) {
                    if (include === "all") {
                        queries.set(queryId, oq);
                        return;
                    }
                    var queryName = oq.queryName, fetchPolicy = oq.options.fetchPolicy;
                    if (fetchPolicy === "standby" ||
                        (include === "active" && !oq.hasObservers())) {
                        return;
                    }
                    if (include === "active" ||
                        (queryName && queryNamesAndDocs.has(queryName)) ||
                        (document && queryNamesAndDocs.has(document))) {
                        queries.set(queryId, oq);
                        if (queryName)
                            queryNamesAndDocs.set(queryName, true);
                        if (document)
                            queryNamesAndDocs.set(document, true);
                    }
                }
            });
            if (legacyQueryOptions.size) {
                legacyQueryOptions.forEach(function (options) {
                    var queryId = makeUniqueId("legacyOneTimeQuery");
                    var queryInfo = _this.getQuery(queryId).init({
                        document: options.query,
                        variables: options.variables,
                    });
                    var oq = new ObservableQuery({
                        queryManager: _this,
                        queryInfo: queryInfo,
                        options: __assign(__assign({}, options), { fetchPolicy: "network-only" }),
                    });
                    invariant$1(oq.queryId === queryId);
                    queryInfo.setObservableQuery(oq);
                    queries.set(queryId, oq);
                });
            }
            if (__DEV__ && queryNamesAndDocs.size) {
                queryNamesAndDocs.forEach(function (included, nameOrDoc) {
                    if (!included) {
                        __DEV__ && invariant$1.warn("Unknown query ".concat(typeof nameOrDoc === "string" ? "named " : "").concat(JSON.stringify(nameOrDoc, null, 2), " requested in refetchQueries options.include array"));
                    }
                });
            }
            return queries;
        };
        QueryManager.prototype.reFetchObservableQueries = function (includeStandby) {
            var _this = this;
            if (includeStandby === void 0) { includeStandby = false; }
            var observableQueryPromises = [];
            this.getObservableQueries(includeStandby ? "all" : "active").forEach(function (observableQuery, queryId) {
                var fetchPolicy = observableQuery.options.fetchPolicy;
                observableQuery.resetLastResults();
                if (includeStandby ||
                    (fetchPolicy !== "standby" &&
                        fetchPolicy !== "cache-only")) {
                    observableQueryPromises.push(observableQuery.refetch());
                }
                _this.getQuery(queryId).setDiff(null);
            });
            this.broadcastQueries();
            return Promise.all(observableQueryPromises);
        };
        QueryManager.prototype.setObservableQuery = function (observableQuery) {
            this.getQuery(observableQuery.queryId).setObservableQuery(observableQuery);
        };
        QueryManager.prototype.startGraphQLSubscription = function (_a) {
            var _this = this;
            var query = _a.query, fetchPolicy = _a.fetchPolicy, errorPolicy = _a.errorPolicy, variables = _a.variables, _b = _a.context, context = _b === void 0 ? {} : _b;
            query = this.transform(query).document;
            variables = this.getVariables(query, variables);
            var makeObservable = function (variables) {
                return _this.getObservableFromLink(query, context, variables).map(function (result) {
                    if (fetchPolicy !== 'no-cache') {
                        if (shouldWriteResult(result, errorPolicy)) {
                            _this.cache.write({
                                query: query,
                                result: result.data,
                                dataId: 'ROOT_SUBSCRIPTION',
                                variables: variables,
                            });
                        }
                        _this.broadcastQueries();
                    }
                    if (graphQLResultHasError(result)) {
                        throw new ApolloError({
                            graphQLErrors: result.errors,
                        });
                    }
                    return result;
                });
            };
            if (this.transform(query).hasClientExports) {
                var observablePromise_1 = this.localState.addExportedVariables(query, variables, context).then(makeObservable);
                return new Observable(function (observer) {
                    var sub = null;
                    observablePromise_1.then(function (observable) { return sub = observable.subscribe(observer); }, observer.error);
                    return function () { return sub && sub.unsubscribe(); };
                });
            }
            return makeObservable(variables);
        };
        QueryManager.prototype.stopQuery = function (queryId) {
            this.stopQueryNoBroadcast(queryId);
            this.broadcastQueries();
        };
        QueryManager.prototype.stopQueryNoBroadcast = function (queryId) {
            this.stopQueryInStoreNoBroadcast(queryId);
            this.removeQuery(queryId);
        };
        QueryManager.prototype.removeQuery = function (queryId) {
            this.fetchCancelFns.delete(queryId);
            if (this.queries.has(queryId)) {
                this.getQuery(queryId).stop();
                this.queries.delete(queryId);
            }
        };
        QueryManager.prototype.broadcastQueries = function () {
            if (this.onBroadcast)
                this.onBroadcast();
            this.queries.forEach(function (info) { return info.notify(); });
        };
        QueryManager.prototype.getLocalState = function () {
            return this.localState;
        };
        QueryManager.prototype.getObservableFromLink = function (query, context, variables, deduplication) {
            var _this = this;
            var _a;
            if (deduplication === void 0) { deduplication = (_a = context === null || context === void 0 ? void 0 : context.queryDeduplication) !== null && _a !== void 0 ? _a : this.queryDeduplication; }
            var observable;
            var serverQuery = this.transform(query).serverQuery;
            if (serverQuery) {
                var _b = this, inFlightLinkObservables_1 = _b.inFlightLinkObservables, link = _b.link;
                var operation = {
                    query: serverQuery,
                    variables: variables,
                    operationName: getOperationName(serverQuery) || void 0,
                    context: this.prepareContext(__assign(__assign({}, context), { forceFetch: !deduplication })),
                };
                context = operation.context;
                if (deduplication) {
                    var byVariables_1 = inFlightLinkObservables_1.get(serverQuery) || new Map();
                    inFlightLinkObservables_1.set(serverQuery, byVariables_1);
                    var varJson_1 = canonicalStringify(variables);
                    observable = byVariables_1.get(varJson_1);
                    if (!observable) {
                        var concast = new Concast([
                            execute(link, operation)
                        ]);
                        byVariables_1.set(varJson_1, observable = concast);
                        concast.cleanup(function () {
                            if (byVariables_1.delete(varJson_1) &&
                                byVariables_1.size < 1) {
                                inFlightLinkObservables_1.delete(serverQuery);
                            }
                        });
                    }
                }
                else {
                    observable = new Concast([
                        execute(link, operation)
                    ]);
                }
            }
            else {
                observable = new Concast([
                    Observable.of({ data: {} })
                ]);
                context = this.prepareContext(context);
            }
            var clientQuery = this.transform(query).clientQuery;
            if (clientQuery) {
                observable = asyncMap(observable, function (result) {
                    return _this.localState.runResolvers({
                        document: clientQuery,
                        remoteResult: result,
                        context: context,
                        variables: variables,
                    });
                });
            }
            return observable;
        };
        QueryManager.prototype.getResultsFromLink = function (queryInfo, cacheWriteBehavior, options) {
            var requestId = queryInfo.lastRequestId = this.generateRequestId();
            return asyncMap(this.getObservableFromLink(queryInfo.document, options.context, options.variables), function (result) {
                var hasErrors = isNonEmptyArray(result.errors);
                if (requestId >= queryInfo.lastRequestId) {
                    if (hasErrors && options.errorPolicy === "none") {
                        throw queryInfo.markError(new ApolloError({
                            graphQLErrors: result.errors,
                        }));
                    }
                    queryInfo.markResult(result, options, cacheWriteBehavior);
                    queryInfo.markReady();
                }
                var aqr = {
                    data: result.data,
                    loading: false,
                    networkStatus: NetworkStatus.ready,
                };
                if (hasErrors && options.errorPolicy !== "ignore") {
                    aqr.errors = result.errors;
                    aqr.networkStatus = NetworkStatus.error;
                }
                return aqr;
            }, function (networkError) {
                var error = isApolloError(networkError)
                    ? networkError
                    : new ApolloError({ networkError: networkError });
                if (requestId >= queryInfo.lastRequestId) {
                    queryInfo.markError(error);
                }
                throw error;
            });
        };
        QueryManager.prototype.fetchQueryObservable = function (queryId, options, networkStatus) {
            var _this = this;
            if (networkStatus === void 0) { networkStatus = NetworkStatus.loading; }
            var query = this.transform(options.query).document;
            var variables = this.getVariables(query, options.variables);
            var queryInfo = this.getQuery(queryId);
            var defaults = this.defaultOptions.watchQuery;
            var _a = options.fetchPolicy, fetchPolicy = _a === void 0 ? defaults && defaults.fetchPolicy || "cache-first" : _a, _b = options.errorPolicy, errorPolicy = _b === void 0 ? defaults && defaults.errorPolicy || "none" : _b, _c = options.returnPartialData, returnPartialData = _c === void 0 ? false : _c, _d = options.notifyOnNetworkStatusChange, notifyOnNetworkStatusChange = _d === void 0 ? false : _d, _e = options.context, context = _e === void 0 ? {} : _e;
            var normalized = Object.assign({}, options, {
                query: query,
                variables: variables,
                fetchPolicy: fetchPolicy,
                errorPolicy: errorPolicy,
                returnPartialData: returnPartialData,
                notifyOnNetworkStatusChange: notifyOnNetworkStatusChange,
                context: context,
            });
            var fromVariables = function (variables) {
                normalized.variables = variables;
                return _this.fetchQueryByPolicy(queryInfo, normalized, networkStatus);
            };
            this.fetchCancelFns.set(queryId, function (reason) {
                setTimeout(function () { return concast.cancel(reason); });
            });
            var concast = new Concast(this.transform(normalized.query).hasClientExports
                ? this.localState.addExportedVariables(normalized.query, normalized.variables, normalized.context).then(fromVariables)
                : fromVariables(normalized.variables));
            concast.cleanup(function () {
                _this.fetchCancelFns.delete(queryId);
                if (queryInfo.observableQuery) {
                    queryInfo.observableQuery["applyNextFetchPolicy"]("after-fetch", options);
                }
            });
            return concast;
        };
        QueryManager.prototype.refetchQueries = function (_a) {
            var _this = this;
            var updateCache = _a.updateCache, include = _a.include, _b = _a.optimistic, optimistic = _b === void 0 ? false : _b, _c = _a.removeOptimistic, removeOptimistic = _c === void 0 ? optimistic ? makeUniqueId("refetchQueries") : void 0 : _c, onQueryUpdated = _a.onQueryUpdated;
            var includedQueriesById = new Map();
            if (include) {
                this.getObservableQueries(include).forEach(function (oq, queryId) {
                    includedQueriesById.set(queryId, {
                        oq: oq,
                        lastDiff: _this.getQuery(queryId).getDiff(),
                    });
                });
            }
            var results = new Map;
            if (updateCache) {
                this.cache.batch({
                    update: updateCache,
                    optimistic: optimistic && removeOptimistic || false,
                    removeOptimistic: removeOptimistic,
                    onWatchUpdated: function (watch, diff, lastDiff) {
                        var oq = watch.watcher instanceof QueryInfo &&
                            watch.watcher.observableQuery;
                        if (oq) {
                            if (onQueryUpdated) {
                                includedQueriesById.delete(oq.queryId);
                                var result = onQueryUpdated(oq, diff, lastDiff);
                                if (result === true) {
                                    result = oq.refetch();
                                }
                                if (result !== false) {
                                    results.set(oq, result);
                                }
                                return result;
                            }
                            if (onQueryUpdated !== null) {
                                includedQueriesById.set(oq.queryId, { oq: oq, lastDiff: lastDiff, diff: diff });
                            }
                        }
                    },
                });
            }
            if (includedQueriesById.size) {
                includedQueriesById.forEach(function (_a, queryId) {
                    var oq = _a.oq, lastDiff = _a.lastDiff, diff = _a.diff;
                    var result;
                    if (onQueryUpdated) {
                        if (!diff) {
                            var info = oq["queryInfo"];
                            info.reset();
                            diff = info.getDiff();
                        }
                        result = onQueryUpdated(oq, diff, lastDiff);
                    }
                    if (!onQueryUpdated || result === true) {
                        result = oq.refetch();
                    }
                    if (result !== false) {
                        results.set(oq, result);
                    }
                    if (queryId.indexOf("legacyOneTimeQuery") >= 0) {
                        _this.stopQueryNoBroadcast(queryId);
                    }
                });
            }
            if (removeOptimistic) {
                this.cache.removeOptimistic(removeOptimistic);
            }
            return results;
        };
        QueryManager.prototype.fetchQueryByPolicy = function (queryInfo, _a, networkStatus) {
            var _this = this;
            var query = _a.query, variables = _a.variables, fetchPolicy = _a.fetchPolicy, refetchWritePolicy = _a.refetchWritePolicy, errorPolicy = _a.errorPolicy, returnPartialData = _a.returnPartialData, context = _a.context, notifyOnNetworkStatusChange = _a.notifyOnNetworkStatusChange;
            var oldNetworkStatus = queryInfo.networkStatus;
            queryInfo.init({
                document: this.transform(query).document,
                variables: variables,
                networkStatus: networkStatus,
            });
            var readCache = function () { return queryInfo.getDiff(variables); };
            var resultsFromCache = function (diff, networkStatus) {
                if (networkStatus === void 0) { networkStatus = queryInfo.networkStatus || NetworkStatus.loading; }
                var data = diff.result;
                if (__DEV__ &&
                    !returnPartialData &&
                    !equal(data, {})) {
                    logMissingFieldErrors(diff.missing);
                }
                var fromData = function (data) { return Observable.of(__assign({ data: data, loading: isNetworkRequestInFlight(networkStatus), networkStatus: networkStatus }, (diff.complete ? null : { partial: true }))); };
                if (data && _this.transform(query).hasForcedResolvers) {
                    return _this.localState.runResolvers({
                        document: query,
                        remoteResult: { data: data },
                        context: context,
                        variables: variables,
                        onlyRunForcedResolvers: true,
                    }).then(function (resolved) { return fromData(resolved.data || void 0); });
                }
                return fromData(data);
            };
            var cacheWriteBehavior = fetchPolicy === "no-cache" ? 0 :
                (networkStatus === NetworkStatus.refetch &&
                    refetchWritePolicy !== "merge") ? 1
                    : 2;
            var resultsFromLink = function () { return _this.getResultsFromLink(queryInfo, cacheWriteBehavior, {
                variables: variables,
                context: context,
                fetchPolicy: fetchPolicy,
                errorPolicy: errorPolicy,
            }); };
            var shouldNotify = notifyOnNetworkStatusChange &&
                typeof oldNetworkStatus === "number" &&
                oldNetworkStatus !== networkStatus &&
                isNetworkRequestInFlight(networkStatus);
            switch (fetchPolicy) {
                default:
                case "cache-first": {
                    var diff = readCache();
                    if (diff.complete) {
                        return [
                            resultsFromCache(diff, queryInfo.markReady()),
                        ];
                    }
                    if (returnPartialData || shouldNotify) {
                        return [
                            resultsFromCache(diff),
                            resultsFromLink(),
                        ];
                    }
                    return [
                        resultsFromLink(),
                    ];
                }
                case "cache-and-network": {
                    var diff = readCache();
                    if (diff.complete || returnPartialData || shouldNotify) {
                        return [
                            resultsFromCache(diff),
                            resultsFromLink(),
                        ];
                    }
                    return [
                        resultsFromLink(),
                    ];
                }
                case "cache-only":
                    return [
                        resultsFromCache(readCache(), queryInfo.markReady()),
                    ];
                case "network-only":
                    if (shouldNotify) {
                        return [
                            resultsFromCache(readCache()),
                            resultsFromLink(),
                        ];
                    }
                    return [resultsFromLink()];
                case "no-cache":
                    if (shouldNotify) {
                        return [
                            resultsFromCache(queryInfo.getDiff()),
                            resultsFromLink(),
                        ];
                    }
                    return [resultsFromLink()];
                case "standby":
                    return [];
            }
        };
        QueryManager.prototype.getQuery = function (queryId) {
            if (queryId && !this.queries.has(queryId)) {
                this.queries.set(queryId, new QueryInfo(this, queryId));
            }
            return this.queries.get(queryId);
        };
        QueryManager.prototype.prepareContext = function (context) {
            if (context === void 0) { context = {}; }
            var newContext = this.localState.prepareContext(context);
            return __assign(__assign({}, newContext), { clientAwareness: this.clientAwareness });
        };
        return QueryManager;
    }());

    var hasSuggestedDevtools = false;
    var ApolloClient = (function () {
        function ApolloClient(options) {
            var _this = this;
            this.resetStoreCallbacks = [];
            this.clearStoreCallbacks = [];
            var uri = options.uri, credentials = options.credentials, headers = options.headers, cache = options.cache, _a = options.ssrMode, ssrMode = _a === void 0 ? false : _a, _b = options.ssrForceFetchDelay, ssrForceFetchDelay = _b === void 0 ? 0 : _b, _c = options.connectToDevTools, connectToDevTools = _c === void 0 ? typeof window === 'object' &&
                !window.__APOLLO_CLIENT__ &&
                __DEV__ : _c, _d = options.queryDeduplication, queryDeduplication = _d === void 0 ? true : _d, defaultOptions = options.defaultOptions, _e = options.assumeImmutableResults, assumeImmutableResults = _e === void 0 ? false : _e, resolvers = options.resolvers, typeDefs = options.typeDefs, fragmentMatcher = options.fragmentMatcher, clientAwarenessName = options.name, clientAwarenessVersion = options.version;
            var link = options.link;
            if (!link) {
                link = uri
                    ? new HttpLink({ uri: uri, credentials: credentials, headers: headers })
                    : ApolloLink.empty();
            }
            if (!cache) {
                throw __DEV__ ? new InvariantError("To initialize Apollo Client, you must specify a 'cache' property " +
                    "in the options object. \n" +
                    "For more information, please visit: https://go.apollo.dev/c/docs") : new InvariantError(7);
            }
            this.link = link;
            this.cache = cache;
            this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
            this.queryDeduplication = queryDeduplication;
            this.defaultOptions = defaultOptions || Object.create(null);
            this.typeDefs = typeDefs;
            if (ssrForceFetchDelay) {
                setTimeout(function () { return (_this.disableNetworkFetches = false); }, ssrForceFetchDelay);
            }
            this.watchQuery = this.watchQuery.bind(this);
            this.query = this.query.bind(this);
            this.mutate = this.mutate.bind(this);
            this.resetStore = this.resetStore.bind(this);
            this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this);
            if (connectToDevTools && typeof window === 'object') {
                window.__APOLLO_CLIENT__ = this;
            }
            if (!hasSuggestedDevtools && __DEV__) {
                hasSuggestedDevtools = true;
                if (typeof window !== 'undefined' &&
                    window.document &&
                    window.top === window.self &&
                    !window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__) {
                    var nav = window.navigator;
                    var ua = nav && nav.userAgent;
                    var url = void 0;
                    if (typeof ua === "string") {
                        if (ua.indexOf("Chrome/") > -1) {
                            url = "https://chrome.google.com/webstore/detail/" +
                                "apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm";
                        }
                        else if (ua.indexOf("Firefox/") > -1) {
                            url = "https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/";
                        }
                    }
                    if (url) {
                        __DEV__ && invariant$1.log("Download the Apollo DevTools for a better development " +
                            "experience: " + url);
                    }
                }
            }
            this.version = version;
            this.localState = new LocalState({
                cache: cache,
                client: this,
                resolvers: resolvers,
                fragmentMatcher: fragmentMatcher,
            });
            this.queryManager = new QueryManager({
                cache: this.cache,
                link: this.link,
                defaultOptions: this.defaultOptions,
                queryDeduplication: queryDeduplication,
                ssrMode: ssrMode,
                clientAwareness: {
                    name: clientAwarenessName,
                    version: clientAwarenessVersion,
                },
                localState: this.localState,
                assumeImmutableResults: assumeImmutableResults,
                onBroadcast: connectToDevTools ? function () {
                    if (_this.devToolsHookCb) {
                        _this.devToolsHookCb({
                            action: {},
                            state: {
                                queries: _this.queryManager.getQueryStore(),
                                mutations: _this.queryManager.mutationStore || {},
                            },
                            dataWithOptimisticResults: _this.cache.extract(true),
                        });
                    }
                } : void 0,
            });
        }
        ApolloClient.prototype.stop = function () {
            this.queryManager.stop();
        };
        ApolloClient.prototype.watchQuery = function (options) {
            if (this.defaultOptions.watchQuery) {
                options = mergeOptions(this.defaultOptions.watchQuery, options);
            }
            if (this.disableNetworkFetches &&
                (options.fetchPolicy === 'network-only' ||
                    options.fetchPolicy === 'cache-and-network')) {
                options = __assign(__assign({}, options), { fetchPolicy: 'cache-first' });
            }
            return this.queryManager.watchQuery(options);
        };
        ApolloClient.prototype.query = function (options) {
            if (this.defaultOptions.query) {
                options = mergeOptions(this.defaultOptions.query, options);
            }
            __DEV__ ? invariant$1(options.fetchPolicy !== 'cache-and-network', 'The cache-and-network fetchPolicy does not work with client.query, because ' +
                'client.query can only return a single result. Please use client.watchQuery ' +
                'to receive multiple results from the cache and the network, or consider ' +
                'using a different fetchPolicy, such as cache-first or network-only.') : invariant$1(options.fetchPolicy !== 'cache-and-network', 8);
            if (this.disableNetworkFetches && options.fetchPolicy === 'network-only') {
                options = __assign(__assign({}, options), { fetchPolicy: 'cache-first' });
            }
            return this.queryManager.query(options);
        };
        ApolloClient.prototype.mutate = function (options) {
            if (this.defaultOptions.mutate) {
                options = mergeOptions(this.defaultOptions.mutate, options);
            }
            return this.queryManager.mutate(options);
        };
        ApolloClient.prototype.subscribe = function (options) {
            return this.queryManager.startGraphQLSubscription(options);
        };
        ApolloClient.prototype.readQuery = function (options, optimistic) {
            if (optimistic === void 0) { optimistic = false; }
            return this.cache.readQuery(options, optimistic);
        };
        ApolloClient.prototype.readFragment = function (options, optimistic) {
            if (optimistic === void 0) { optimistic = false; }
            return this.cache.readFragment(options, optimistic);
        };
        ApolloClient.prototype.writeQuery = function (options) {
            this.cache.writeQuery(options);
            this.queryManager.broadcastQueries();
        };
        ApolloClient.prototype.writeFragment = function (options) {
            this.cache.writeFragment(options);
            this.queryManager.broadcastQueries();
        };
        ApolloClient.prototype.__actionHookForDevTools = function (cb) {
            this.devToolsHookCb = cb;
        };
        ApolloClient.prototype.__requestRaw = function (payload) {
            return execute(this.link, payload);
        };
        ApolloClient.prototype.resetStore = function () {
            var _this = this;
            return Promise.resolve()
                .then(function () { return _this.queryManager.clearStore({
                discardWatches: false,
            }); })
                .then(function () { return Promise.all(_this.resetStoreCallbacks.map(function (fn) { return fn(); })); })
                .then(function () { return _this.reFetchObservableQueries(); });
        };
        ApolloClient.prototype.clearStore = function () {
            var _this = this;
            return Promise.resolve()
                .then(function () { return _this.queryManager.clearStore({
                discardWatches: true,
            }); })
                .then(function () { return Promise.all(_this.clearStoreCallbacks.map(function (fn) { return fn(); })); });
        };
        ApolloClient.prototype.onResetStore = function (cb) {
            var _this = this;
            this.resetStoreCallbacks.push(cb);
            return function () {
                _this.resetStoreCallbacks = _this.resetStoreCallbacks.filter(function (c) { return c !== cb; });
            };
        };
        ApolloClient.prototype.onClearStore = function (cb) {
            var _this = this;
            this.clearStoreCallbacks.push(cb);
            return function () {
                _this.clearStoreCallbacks = _this.clearStoreCallbacks.filter(function (c) { return c !== cb; });
            };
        };
        ApolloClient.prototype.reFetchObservableQueries = function (includeStandby) {
            return this.queryManager.reFetchObservableQueries(includeStandby);
        };
        ApolloClient.prototype.refetchQueries = function (options) {
            var map = this.queryManager.refetchQueries(options);
            var queries = [];
            var results = [];
            map.forEach(function (result, obsQuery) {
                queries.push(obsQuery);
                results.push(result);
            });
            var result = Promise.all(results);
            result.queries = queries;
            result.results = results;
            result.catch(function (error) {
                __DEV__ && invariant$1.debug("In client.refetchQueries, Promise.all promise rejected with error ".concat(error));
            });
            return result;
        };
        ApolloClient.prototype.getObservableQueries = function (include) {
            if (include === void 0) { include = "active"; }
            return this.queryManager.getObservableQueries(include);
        };
        ApolloClient.prototype.extract = function (optimistic) {
            return this.cache.extract(optimistic);
        };
        ApolloClient.prototype.restore = function (serializedState) {
            return this.cache.restore(serializedState);
        };
        ApolloClient.prototype.addResolvers = function (resolvers) {
            this.localState.addResolvers(resolvers);
        };
        ApolloClient.prototype.setResolvers = function (resolvers) {
            this.localState.setResolvers(resolvers);
        };
        ApolloClient.prototype.getResolvers = function () {
            return this.localState.getResolvers();
        };
        ApolloClient.prototype.setLocalStateFragmentMatcher = function (fragmentMatcher) {
            this.localState.setFragmentMatcher(fragmentMatcher);
        };
        ApolloClient.prototype.setLink = function (newLink) {
            this.link = this.queryManager.link = newLink;
        };
        return ApolloClient;
    }());

    var docCache = new Map();
    var fragmentSourceMap = new Map();
    var printFragmentWarnings = true;
    var experimentalFragmentVariables = false;
    function normalize(string) {
        return string.replace(/[\s,]+/g, ' ').trim();
    }
    function cacheKeyFromLoc(loc) {
        return normalize(loc.source.body.substring(loc.start, loc.end));
    }
    function processFragments(ast) {
        var seenKeys = new Set();
        var definitions = [];
        ast.definitions.forEach(function (fragmentDefinition) {
            if (fragmentDefinition.kind === 'FragmentDefinition') {
                var fragmentName = fragmentDefinition.name.value;
                var sourceKey = cacheKeyFromLoc(fragmentDefinition.loc);
                var sourceKeySet = fragmentSourceMap.get(fragmentName);
                if (sourceKeySet && !sourceKeySet.has(sourceKey)) {
                    if (printFragmentWarnings) {
                        console.warn("Warning: fragment with name " + fragmentName + " already exists.\n"
                            + "graphql-tag enforces all fragment names across your application to be unique; read more about\n"
                            + "this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names");
                    }
                }
                else if (!sourceKeySet) {
                    fragmentSourceMap.set(fragmentName, sourceKeySet = new Set);
                }
                sourceKeySet.add(sourceKey);
                if (!seenKeys.has(sourceKey)) {
                    seenKeys.add(sourceKey);
                    definitions.push(fragmentDefinition);
                }
            }
            else {
                definitions.push(fragmentDefinition);
            }
        });
        return __assign(__assign({}, ast), { definitions: definitions });
    }
    function stripLoc(doc) {
        var workSet = new Set(doc.definitions);
        workSet.forEach(function (node) {
            if (node.loc)
                delete node.loc;
            Object.keys(node).forEach(function (key) {
                var value = node[key];
                if (value && typeof value === 'object') {
                    workSet.add(value);
                }
            });
        });
        var loc = doc.loc;
        if (loc) {
            delete loc.startToken;
            delete loc.endToken;
        }
        return doc;
    }
    function parseDocument(source) {
        var cacheKey = normalize(source);
        if (!docCache.has(cacheKey)) {
            var parsed = parse(source, {
                experimentalFragmentVariables: experimentalFragmentVariables,
                allowLegacyFragmentVariables: experimentalFragmentVariables
            });
            if (!parsed || parsed.kind !== 'Document') {
                throw new Error('Not a valid GraphQL document.');
            }
            docCache.set(cacheKey, stripLoc(processFragments(parsed)));
        }
        return docCache.get(cacheKey);
    }
    function gql(literals) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof literals === 'string') {
            literals = [literals];
        }
        var result = literals[0];
        args.forEach(function (arg, i) {
            if (arg && arg.kind === 'Document') {
                result += arg.loc.source.body;
            }
            else {
                result += arg;
            }
            result += literals[i + 1];
        });
        return parseDocument(result);
    }
    function resetCaches() {
        docCache.clear();
        fragmentSourceMap.clear();
    }
    function disableFragmentWarnings() {
        printFragmentWarnings = false;
    }
    function enableExperimentalFragmentVariables() {
        experimentalFragmentVariables = true;
    }
    function disableExperimentalFragmentVariables() {
        experimentalFragmentVariables = false;
    }
    var extras = {
        gql: gql,
        resetCaches: resetCaches,
        disableFragmentWarnings: disableFragmentWarnings,
        enableExperimentalFragmentVariables: enableExperimentalFragmentVariables,
        disableExperimentalFragmentVariables: disableExperimentalFragmentVariables
    };
    (function (gql_1) {
        gql_1.gql = extras.gql, gql_1.resetCaches = extras.resetCaches, gql_1.disableFragmentWarnings = extras.disableFragmentWarnings, gql_1.enableExperimentalFragmentVariables = extras.enableExperimentalFragmentVariables, gql_1.disableExperimentalFragmentVariables = extras.disableExperimentalFragmentVariables;
    })(gql || (gql = {}));
    gql["default"] = gql;

    const CLIENT = typeof Symbol !== "undefined" ? Symbol("client") : "@@client";
    function getClient() {
        const client = getContext(CLIENT);
        if (!client) {
            throw new Error("ApolloClient has not been set yet, use setClient(new ApolloClient({ ... })) to define it");
        }
        return client;
    }
    function setClient(client) {
        setContext(CLIENT, client);
    }

    function observableToReadable(observable, initialValue = {
        loading: true,
        data: undefined,
        error: undefined,
    }) {
        const store = readable(initialValue, (set) => {
            const skipDuplicate = initialValue?.data !== undefined;
            let skipped = false;
            const subscription = observable.subscribe((result) => {
                if (skipDuplicate && !skipped) {
                    skipped = true;
                    return;
                }
                if (result.errors) {
                    const error = new ApolloError({ graphQLErrors: result.errors });
                    set({ loading: false, data: undefined, error });
                }
                else {
                    set({ loading: false, data: result.data, error: undefined });
                }
            }, (error) => set({
                loading: false,
                data: undefined,
                error: error && "message" in error ? error : new Error(error),
            }));
            return () => subscription.unsubscribe();
        });
        return store;
    }
    const extensions = [
        "fetchMore",
        "getCurrentResult",
        "getLastError",
        "getLastResult",
        "isDifferentFromLastResult",
        "refetch",
        "resetLastResults",
        "resetQueryStoreErrors",
        "result",
        "setOptions",
        "setVariables",
        "startPolling",
        "stopPolling",
        "subscribeToMore",
        "updateQuery",
    ];
    function observableQueryToReadable(query, initialValue) {
        const store = observableToReadable(query, initialValue);
        for (const extension of extensions) {
            store[extension] = query[extension].bind(query);
        }
        return store;
    }

    const restoring = typeof WeakSet !== "undefined" ? new WeakSet() : new Set();

    function query(query, options = {}) {
        const client = getClient();
        const queryOptions = { ...options, query };
        // If client is restoring (e.g. from SSR), attempt synchronous readQuery first
        let initialValue;
        if (restoring.has(client)) {
            try {
                // undefined = skip initial value (not in cache)
                initialValue = client.readQuery(queryOptions) || undefined;
            }
            catch (err) {
                // Ignore preload errors
            }
        }
        const observable = client.watchQuery(queryOptions);
        const store = observableQueryToReadable(observable, initialValue !== undefined
            ? {
                data: initialValue,
            }
            : undefined);
        return store;
    }

    /* src/App.svelte generated by Svelte v3.48.0 */

    const { console: console_1 } = globals;
    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (51:12) {:catch error}
    function create_catch_block(ctx) {
    	let t0;
    	let t1_value = /*error*/ ctx[10] + "";
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text("Don't know what to say: ");
    			t1 = text(t1_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*fields*/ 2 && t1_value !== (t1_value = /*error*/ ctx[10] + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block.name,
    		type: "catch",
    		source: "(51:12) {:catch error}",
    		ctx
    	});

    	return block;
    }

    // (47:12) {:then f}
    function create_then_block(ctx) {
    	let each_1_anchor;
    	let each_value = /*f*/ ctx[6].data.technology_fields;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*fields*/ 2) {
    				each_value = /*f*/ ctx[6].data.technology_fields;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block.name,
    		type: "then",
    		source: "(47:12) {:then f}",
    		ctx
    	});

    	return block;
    }

    // (48:16) {#each f.data.technology_fields as field}
    function create_each_block(ctx) {
    	let option;
    	let t_value = /*field*/ ctx[7].name + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*field*/ ctx[7].name;
    			option.value = option.__value;
    			add_location(option, file, 48, 20, 1421);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*fields*/ 2 && t_value !== (t_value = /*field*/ ctx[7].name + "")) set_data_dev(t, t_value);

    			if (dirty & /*fields*/ 2 && option_value_value !== (option_value_value = /*field*/ ctx[7].name)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(48:16) {#each f.data.technology_fields as field}",
    		ctx
    	});

    	return block;
    }

    // (41:27)              <option>1</option>             <option>2</option>             <option>3</option>             <option>4</option>             <option>5</option>             {:then f}
    function create_pending_block(ctx) {
    	let option0;
    	let t1;
    	let option1;
    	let t3;
    	let option2;
    	let t5;
    	let option3;
    	let t7;
    	let option4;

    	const block = {
    		c: function create() {
    			option0 = element("option");
    			option0.textContent = "1";
    			t1 = space();
    			option1 = element("option");
    			option1.textContent = "2";
    			t3 = space();
    			option2 = element("option");
    			option2.textContent = "3";
    			t5 = space();
    			option3 = element("option");
    			option3.textContent = "4";
    			t7 = space();
    			option4 = element("option");
    			option4.textContent = "5";
    			option0.__value = "1";
    			option0.value = option0.__value;
    			add_location(option0, file, 41, 12, 1178);
    			option1.__value = "2";
    			option1.value = option1.__value;
    			add_location(option1, file, 42, 12, 1209);
    			option2.__value = "3";
    			option2.value = option2.__value;
    			add_location(option2, file, 43, 12, 1240);
    			option3.__value = "4";
    			option3.value = option3.__value;
    			add_location(option3, file, 44, 12, 1271);
    			option4.__value = "5";
    			option4.value = option4.__value;
    			add_location(option4, file, 45, 12, 1302);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, option1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, option2, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, option3, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, option4, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(option1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(option2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(option3);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(option4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block.name,
    		type: "pending",
    		source: "(41:27)              <option>1</option>             <option>2</option>             <option>3</option>             <option>4</option>             <option>5</option>             {:then f}",
    		ctx
    	});

    	return block;
    }

    // (40:8) <Input type="select" name="select" id="exampleSelect">
    function create_default_slot_2(ctx) {
    	let await_block_anchor;
    	let promise;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block,
    		then: create_then_block,
    		catch: create_catch_block,
    		value: 6,
    		error: 10
    	};

    	handle_promise(promise = /*fields*/ ctx[1], info);

    	const block = {
    		c: function create() {
    			await_block_anchor = empty();
    			info.block.c();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, await_block_anchor, anchor);
    			info.block.m(target, info.anchor = anchor);
    			info.mount = () => await_block_anchor.parentNode;
    			info.anchor = await_block_anchor;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			info.ctx = ctx;

    			if (dirty & /*fields*/ 2 && promise !== (promise = /*fields*/ ctx[1]) && handle_promise(promise, info)) ; else {
    				update_await_block_branch(info, ctx, dirty);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(await_block_anchor);
    			info.block.d(detaching);
    			info.token = null;
    			info = null;
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(40:8) <Input type=\\\"select\\\" name=\\\"select\\\" id=\\\"exampleSelect\\\">",
    		ctx
    	});

    	return block;
    }

    // (39:4) <FormGroup>
    function create_default_slot_1(ctx) {
    	let input;
    	let current;

    	input = new Input({
    			props: {
    				type: "select",
    				name: "select",
    				id: "exampleSelect",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(input.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const input_changes = {};

    			if (dirty & /*$$scope, fields*/ 2050) {
    				input_changes.$$scope = { dirty, ctx };
    			}

    			input.$set(input_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(input, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(39:4) <FormGroup>",
    		ctx
    	});

    	return block;
    }

    // (38:0) <Form>
    function create_default_slot(ctx) {
    	let formgroup;
    	let current;

    	formgroup = new FormGroup({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formgroup.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formgroup, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formgroup_changes = {};

    			if (dirty & /*$$scope, fields*/ 2050) {
    				formgroup_changes.$$scope = { dirty, ctx };
    			}

    			formgroup.$set(formgroup_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formgroup.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formgroup.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formgroup, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(38:0) <Form>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let h1;
    	let t0;
    	let t1;
    	let t2;
    	let form;
    	let current;

    	form = new Form({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t0 = text("Let's go ");
    			t1 = text(/*arrived*/ ctx[0]);
    			t2 = space();
    			create_component(form.$$.fragment);
    			add_location(h1, file, 35, 0, 1023);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t0);
    			append_dev(h1, t1);
    			insert_dev(target, t2, anchor);
    			mount_component(form, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*arrived*/ 1) set_data_dev(t1, /*arrived*/ ctx[0]);
    			const form_changes = {};

    			if (dirty & /*$$scope, fields*/ 2050) {
    				form_changes.$$scope = { dirty, ctx };
    			}

    			form.$set(form_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(form.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(form.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t2);
    			destroy_component(form, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let fields;
    	let arrived;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	const client = new ApolloClient({
    			uri: 'http://localhost:8080/v1/graphql',
    			cache: new InMemoryCache()
    		});

    	// export let authToken;
    	// setClient(client);
    	const FIELDS = gql`query { technology_fields { id name description } }`;

    	const fieldsQuery = client.query({ query: FIELDS });
    	console.log(fieldsQuery);

    	fieldsQuery.then(response => {
    		console.log(response);
    	});

    	fieldsQuery.catch(reason => {
    		console.log("What happened: " + reason);
    	});

    	let name = "Biden";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Form,
    		FormGroup,
    		FormText,
    		Input,
    		Label,
    		ApolloClient,
    		InMemoryCache,
    		HttpLink,
    		client,
    		setClient,
    		gql,
    		query,
    		FIELDS,
    		fieldsQuery,
    		name,
    		arrived,
    		fields
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) name = $$props.name;
    		if ('arrived' in $$props) $$invalidate(0, arrived = $$props.arrived);
    		if ('fields' in $$props) $$invalidate(1, fields = $$props.fields);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$invalidate(1, fields = fieldsQuery);
    	$$invalidate(0, arrived = fieldsQuery.data ? true : false);
    	return [arrived, fields];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
