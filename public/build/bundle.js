
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
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
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
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
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }
    function split_css_unit(value) {
        const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
        return split ? [parseFloat(split[1]), split[2] || 'px'] : [value, 'px'];
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
        return style.sheet;
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
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
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
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
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }
    class HtmlTag {
        constructor(is_svg = false) {
            this.is_svg = false;
            this.is_svg = is_svg;
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                if (this.is_svg)
                    this.e = svg_element(target.nodeName);
                /** #7364  target for <template> may be provided as #document-fragment(11) */
                else
                    this.e = element((target.nodeType === 11 ? 'TEMPLATE' : target.nodeName));
                this.t = target.tagName !== 'TEMPLATE' ? target : target.content;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.nodeName === 'TEMPLATE' ? this.e.content.childNodes : this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { ownerNode } = info.stylesheet;
                // there is no ownerNode if it runs on jsdom.
                if (ownerNode)
                    detach(ownerNode);
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
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
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
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
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
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
        else if (callback) {
            callback();
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        const options = { direction: 'in' };
        let config = fn(node, params, options);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config(options);
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        const options = { direction: 'out' };
        let config = fn(node, params, options);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config(options);
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        const options = { direction: 'both' };
        let config = fn(node, params, options);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config(options);
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        const updates = [];
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                // defer updates until all the DOM shuffling is done
                updates.push(() => block.p(child_ctx, dirty));
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        run_all(updates);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
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
            flush_render_callbacks($$.after_update);
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
            ctx: [],
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
            if (!is_function(callback)) {
                return noop;
            }
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
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
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
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
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
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
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

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=} start
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
                if (subscribers.size === 0 && stop) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    var ALL_TAGS = [
        'frontend',
        'backend',
        'devops/sre',
        'tech&#8239;health',
        'consulting',
        'other',
        'non&#8209;tech',
    ];
    var HIDE_NON_TECH_INITIALLY = true;
    var DATE_FORMAT = 'MM/YY';

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var dayjs_min = createCommonjsModule(function (module, exports) {
    !function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return "["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(g=i),i||!r&&g},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=v;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t);}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return O},m.isValid=function(){return !(this.$d.toString()===l)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),l=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(h){case c:return r?l(1,0):l(31,11);case f:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),l=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,l=this;r=Number(r);var $=O.p(h),y=function(t){var e=w(l);return O.w(e.date(e.date()+Math.round(t*r)),l)};if($===f)return this.set(f,this.$M+r);if($===c)return this.set(c,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},$={YY:String(this.$y).slice(-2),YYYY:O.s(this.$y,4,"0"),M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||$[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,v=this-M,g=O.m(this,M);return g=($={},$[c]=g/12,$[f]=g,$[h]=g/3,$[o]=(v-m)/6048e5,$[a]=(v-m)/864e5,$[u]=v/n,$[s]=v/e,$[i]=v/t,$)[y]||v,l?g:O.a(g)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),T=_.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[g],w.Ls=D,w.p={},w}));
    });

    var customParseFormat = createCommonjsModule(function (module, exports) {
    !function(e,t){module.exports=t();}(commonjsGlobal,(function(){var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d\d/,r=/\d\d?/,i=/\d*[^-_:/,()\s\d]+/,o={},s=function(e){return (e=+e)+(e>68?1900:2e3)};var a=function(e){return function(t){this[e]=+t;}},f=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e)return 0;if("Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),n=60*t[1]+(+t[2]||0);return 0===n?0:"+"===t[0]?-n:n}(e);}],h=function(e){var t=o[e];return t&&(t.indexOf?t:t.s.concat(t.f))},u=function(e,t){var n,r=o.meridiem;if(r){for(var i=1;i<=24;i+=1)if(e.indexOf(r(i,0,t))>-1){n=i>12;break}}else n=e===(t?"pm":"PM");return n},d={A:[i,function(e){this.afternoon=u(e,!1);}],a:[i,function(e){this.afternoon=u(e,!0);}],S:[/\d/,function(e){this.milliseconds=100*+e;}],SS:[n,function(e){this.milliseconds=10*+e;}],SSS:[/\d{3}/,function(e){this.milliseconds=+e;}],s:[r,a("seconds")],ss:[r,a("seconds")],m:[r,a("minutes")],mm:[r,a("minutes")],H:[r,a("hours")],h:[r,a("hours")],HH:[r,a("hours")],hh:[r,a("hours")],D:[r,a("day")],DD:[n,a("day")],Do:[i,function(e){var t=o.ordinal,n=e.match(/\d+/);if(this.day=n[0],t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,"")===e&&(this.day=r);}],M:[r,a("month")],MM:[n,a("month")],MMM:[i,function(e){var t=h("months"),n=(h("monthsShort")||t.map((function(e){return e.slice(0,3)}))).indexOf(e)+1;if(n<1)throw new Error;this.month=n%12||n;}],MMMM:[i,function(e){var t=h("months").indexOf(e)+1;if(t<1)throw new Error;this.month=t%12||t;}],Y:[/[+-]?\d+/,a("year")],YY:[n,function(e){this.year=s(e);}],YYYY:[/\d{4}/,a("year")],Z:f,ZZ:f};function c(n){var r,i;r=n,i=o&&o.formats;for(var s=(n=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,n,r){var o=r&&r.toUpperCase();return n||i[r]||e[r]||i[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,n){return t||n.slice(1)}))}))).match(t),a=s.length,f=0;f<a;f+=1){var h=s[f],u=d[h],c=u&&u[0],l=u&&u[1];s[f]=l?{regex:c,parser:l}:h.replace(/^\[|\]$/g,"");}return function(e){for(var t={},n=0,r=0;n<a;n+=1){var i=s[n];if("string"==typeof i)r+=i.length;else {var o=i.regex,f=i.parser,h=e.slice(r),u=o.exec(h)[0];f.call(t,u),e=e.replace(u,"");}}return function(e){var t=e.afternoon;if(void 0!==t){var n=e.hours;t?n<12&&(e.hours+=12):12===n&&(e.hours=0),delete e.afternoon;}}(t),t}}return function(e,t,n){n.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(s=e.parseTwoDigitYear);var r=t.prototype,i=r.parse;r.parse=function(e){var t=e.date,r=e.utc,s=e.args;this.$u=r;var a=s[1];if("string"==typeof a){var f=!0===s[2],h=!0===s[3],u=f||h,d=s[2];h&&(d=s[2]),o=this.$locale(),!f&&d&&(o=n.Ls[d]),this.$d=function(e,t,n){try{if(["x","X"].indexOf(t)>-1)return new Date(("X"===t?1e3:1)*e);var r=c(t)(e),i=r.year,o=r.month,s=r.day,a=r.hours,f=r.minutes,h=r.seconds,u=r.milliseconds,d=r.zone,l=new Date,m=s||(i||o?1:l.getDate()),M=i||l.getFullYear(),Y=0;i&&!o||(Y=o>0?o-1:l.getMonth());var p=a||0,v=f||0,D=h||0,g=u||0;return d?new Date(Date.UTC(M,Y,m,p,v,D,g+60*d.offset*1e3)):n?new Date(Date.UTC(M,Y,m,p,v,D,g)):new Date(M,Y,m,p,v,D,g)}catch(e){return new Date("")}}(t,a,r),this.init(),d&&!0!==d&&(this.$L=this.locale(d).$L),u&&t!=this.format(a)&&(this.$d=new Date("")),o={};}else if(a instanceof Array)for(var l=a.length,m=1;m<=l;m+=1){s[1]=a[m-1];var M=n.apply(this,s);if(M.isValid()){this.$d=M.$d,this.$L=M.$L,this.init();break}m===l&&(this.$d=new Date(""));}else i.call(this,e);};}}));
    });

    dayjs_min.extend(customParseFormat);
    var introText = {
        de: [
            "Manchmal kann ich gar nicht glauben, dass ich für etwas bezahlt werde, das so viel Spass macht. Ich habe ein unbändiges Verlangen danach, großartige Dinge zu bauen, komplexe Probleme auf einem hohen Niveau zu lösen und neue, schwierige Dinge zu lernen.",
            "Hi. Mein Name ist Konstantin und ddas ist mein interaktiver Lebenslauf. Bitte schau Dich um! Ich hoffe, dass dir die UX, die ich implementiert habe hilft, die Informationen, die Du suchst, schneller zu finden. Falls Du den Lebenslauf ausgedruckt brauchst, dann kannst du das ganz leicht machen, die Seite hat CSS speziell für die gedruckter Version.",
            'Ich bin ein Webentwickler, der gerne in technisch herausforderndere Gefielde vorstoßen würde. Ich habe in der Vergangenheit sowohl an großen, als auch an kleinen Projekten gearbeitet, hauptsächlich im Frontend mit React. Obwohl ich es sehr genieße in diesem Bereich zu arbeiten, werden mein Durst nach etwas Neuem and meine Neugier auf Technologien "näher am Metall" zunehmend lauter.',
            "Aus diesem Grund, und weil ich meine Leistungsbereitschaft derzeit nicht voll ausgeschöpft sehe, suche ich nach neuen Herausforderungen in der Rust Programmiersprache. Idealerweise (aber nicht zwingend), wäre es eine Aufgabe, in der ich auch meine bisherig erlangte Expertise einsetzen kann, was zum Beispiel bei webAssembly der Fall wäre.",
        ],
        en: [
            "Sometimes I can't believe I get paid for something that is so much fun. I have an undying desire to build great things, solve complex problems on a high level and learn new, challenging things.",
            "Hi. My name is Konstantin, and this is my interactive CV. Please have a look around. I hope the UX I have implemented helps you find the information you seek more easily. If you need to print the CV, you can easily do so. The page comes with print styles.",
            'I am a web developer looking to make his way onto technically more challenging and sophisticated waters. I have worked on large and small projects in recent years, mainly on the front end using React. While I like working in this domain, my thirst for learning something new and my curiosity about getting "closer to the metal" has become increasingly harder to ignore. ',
            "This, and because I don't currently see my vigour fully utilized, is why I am looking to take on a new challenge using the Rust programming language. Ideally (not a must), I could also leverage the knowledge I have already gained by working as a web dev, which would, for example, be the case for working with webAssembly.",
        ]
    };
    var cvJobItems = {
        heading: { de: "Berufserfahrung", en: "Work Experience" },
        items: [
            {
                label: { intl: "Seatti" },
                time: {
                    from: dayjs_min("07/22", DATE_FORMAT),
                    to: dayjs_min("08/23", DATE_FORMAT)
                },
                list: [
                    {
                        label: {
                            en: "part of a very early stage startup",
                            de: "Teil eines Startups im sehr früher Stadium"
                        }
                    },
                    {
                        label: {
                            en: "involved in underlying architectural and technical decisions and evaluations",
                            de: "involviert in der Entscheidungsfindung bei grundlegenden technischen Entscheidungen und Evaluierungen"
                        }
                    },
                    {
                        label: {
                            en: "integral part of facing challenges of scaling tech, product and team",
                            de: "direkt in der Arbeit an den Herausforderungen eines wachsenden Produkts, Infrastruktur und Teams beteiligt"
                        }
                    },
                    {
                        label: {
                            en: "deep insights into other areas of developing a VC-funded startup (Marketing, Sales, Finance, Investor relations)",
                            de: "tiefe Einblicke in die anderen Bereiche eines VC-finanzierten Startups (Marketing, Sales, Finance, Investor Relations)"
                        }
                    },
                ],
                tags: ["frontend", "backend", "tech&#8239;health"]
            },
            {
                label: { intl: "willhaben" },
                time: {
                    from: dayjs_min("05/21", DATE_FORMAT),
                    to: dayjs_min("04/22", DATE_FORMAT)
                },
                list: [
                    {
                        label: {
                            de: "formal als externer Entwickler, aber zu 100% in das Unternehmen eingegliedert",
                            en: "formally an external Developer, but 100% integrated within the company"
                        }
                    },
                    {
                        label: {
                            en: "most visited Austrian website",
                            de: "meistbesuchte österreichische Website"
                        }
                    },
                    {
                        label: {
                            en: "gathered experience in two different tribes for multiple months each",
                            de: "mehrmonatige Erfahrungen in zwei unterschiedlichen Tribes gesammelt"
                        }
                    },
                    {
                        label: {
                            en: "knowledge both deepened and broadened, developeped T-shaped expertise",
                            de: "Wissen vertieft, aber auch verbreitert, teaminterne T-shaped Expertise"
                        }
                    },
                    {
                        label: {
                            en: "complete agile workflow",
                            de: "kompletter agiler Workflow"
                        }
                    },
                    {
                        label: {
                            en: "various internal interdisciplinairy training",
                            de: "diverse interne disziplinübergreifende Weiterbilungen"
                        }
                    },
                    {
                        label: {
                            en: 'lived "technical excellence"',
                            de: 'gelebte "technical Excellence"'
                        }
                    },
                ],
                tags: ["frontend", "backend", "tech&#8239;health", "other"]
            },
            {
                label: { intl: "Coding School & Academy Wörthersee" },
                time: {
                    from: dayjs_min("05/21", DATE_FORMAT),
                    to: dayjs_min("06/22", DATE_FORMAT)
                },
                list: [
                    {
                        label: {
                            en: "written, prepared and held web development crash course for part time students twice",
                            de: "zweimal den berufbegleitenden Crashkurs Webdevelopment vorbereitet und unterrichtet"
                        }
                    },
                    {
                        label: {
                            en: "written, prepared and held HTML & CSS Course for full-time students twice",
                            de: "zweimal den HTML & CSS Basics Kurs für den Vollzeitstudiengang unterrichtet"
                        }
                    },
                    {
                        label: {
                            en: "examination of various (final) projects ",
                            de: "diverse Projekt- und Abschlussarbeiten benotet"
                        }
                    },
                    {
                        label: {
                            en: "Examiner for the final exams",
                            de: "Abschlussprüfungen als Prüfer abgenommen"
                        }
                    },
                ],
                tags: ["frontend", "consulting", "other"]
            },
            {
                label: { intl: "Web&Söhne" },
                time: {
                    from: dayjs_min("01/20", DATE_FORMAT),
                    to: dayjs_min("04/22", DATE_FORMAT)
                },
                list: [
                    {
                        label: {
                            en: "Green field project with UNIQA initialized and started",
                            de: "Greenfield-Project mit UNIQA aufgesetzt und begonnen"
                        }
                    },
                    {
                        label: {
                            en: "development of internal tooling",
                            de: "Entwickeln interner Tools"
                        }
                    },
                    {
                        label: {
                            en: "various small projects with existing customers, often with legacy code",
                            de: "diverse kleine Projekte mit Bestandskunden, oft mit Legacy-Code"
                        }
                    },
                ],
                tags: ["frontend", "backend", "tech&#8239;health", "other"]
            },
            {
                label: {
                    en: "Projects & Freelancing",
                    de: "Projektarbeiten & Freelancing"
                },
                time: { from: dayjs_min("11/18", DATE_FORMAT) },
                list: [
                    {
                        label: {
                            en: 'own <a href="https://marketplace.visualstudio.com/items?itemName=KonstantinKovar.classnames-rainbow" target="_blank">VSCode-Extension</a> for atomic-css users (now deprecated)',
                            de: 'eigene <a href="https://marketplace.visualstudio.com/items?itemName=KonstantinKovar.classnames-rainbow" target="_blank">VSCode-Extension</a> für atomic-css User (deprecated)'
                        }
                    },
                    {
                        label: {
                            en: 'for <a href="https://adapowerwoman.at/">Ada - Power Woman</a> (Technical Consulting)',
                            de: 'für <a href="https://adapowerwoman.at/">Ada - Power Woman</a> (Technical Consulting)'
                        }
                    },
                    {
                        label: {
                            en: 'for <a href="https://sgreening.io/">sgreening</a> (Webdevelopment & Consulting)',
                            de: 'für <a href="https://sgreening.io/">sgreening</a> (Webdevelopment & Consulting)'
                        }
                    },
                    {
                        label: {
                            en: "Porsche Wien Mitte (WordPress-Development & Consulting)",
                            de: "Porsche Wien Mitte (WordPress-Entwicklung & Consulting)"
                        }
                    },
                ],
                tags: ["frontend", "consulting", "tech&#8239;health", "other"]
            },
            {
                label: { intl: "der brutkasten" },
                tagLine: {
                    de: "WordPress & Frontend Entwickler",
                    en: "WordPress & Frontend Developer"
                },
                time: {
                    from: dayjs_min("04/18", DATE_FORMAT),
                    to: dayjs_min("11/18", DATE_FORMAT)
                },
                list: [
                    {
                        label: {
                            en: "WordPress Theme programming with very old legacy code",
                            de: "WordPress Theme-Programmierung mit sehr altem Legacy Code"
                        }
                    },
                    {
                        label: {
                            en: "Production of an internal CRM",
                            de: "Erstellung eines internen CRM"
                        }
                    },
                    {
                        label: {
                            en: "Content und business strategy from a technical perspective",
                            de: "Content- und Businessstrategie aus technischer Perspektive"
                        }
                    },
                ],
                tags: ["frontend", "devops/sre"]
            },
            {
                label: { en: "Projects", de: "Projektarbeiten" },
                time: {
                    from: dayjs_min("01/08", DATE_FORMAT),
                    to: dayjs_min("12/18", DATE_FORMAT)
                },
                list: [
                    {
                        label: {
                            en: 'Logo- and corporate design for <a href="https://sgreening.io/">sgreening</a> (meanwhile rebranded)',
                            de: 'Logo- und Corporatedesign für <a href="https://sgreening.io/">sgreening</a> (mittlerweile gerebranded)'
                        }
                    },
                    {
                        label: {
                            en: "Production of audio and video content for Radio Arabella",
                            de: "Umsetzen von Audio- und Videoprojekten für Radio Arabella"
                        }
                    },
                    {
                        label: {
                            en: "Automating most of my work at the district office",
                            de: "Autmatisierung eines Großteils meiner Arbeit am Bezirksamt Hernals"
                        }
                    },
                    {
                        label: {
                            en: "Contributions to Marketing Concept for Radio NRJ Austria",
                            de: "Mitarbeit an Marketingkonzept für Radio NRJ Österreich"
                        }
                    },
                    {
                        label: {
                            en: 'Contributions to TV-Show "Brennweite"',
                            de: 'Mitarbeit an TV-Sendungsformat "Brennweite" der FH Wien'
                        }
                    },
                    {
                        label: {
                            en: "Contributions to Radio NJoy",
                            de: "Mitarbeit an Sendungen für Radio NJoy"
                        }
                    },
                    {
                        label: {
                            en: "Logo- und Corporatedesign für lectureclips.com <i>(not active anymore)</i>",
                            de: "Logo- und Corporatedesign für lectureclips.com <i>(nicht mehr aktiv)</i>"
                        }
                    },
                ],
                tags: ["non&#8209;tech"]
            },
            {
                label: {
                    en: "District Office",
                    de: "Bezirksämter 16 & 17"
                },
                tagLine: {
                    en: "administrative penalties and trade/business law",
                    de: "Verwaltungstrafen und Gewerberecht"
                },
                time: {
                    from: dayjs_min("05/15", "MM/YYYY"),
                    to: dayjs_min("12/20", "MM/YYYY")
                },
                list: [
                    {
                        label: {
                            en: "scrupulous legal work",
                            de: "gewissenhaftes juristisches Arbeiten"
                        }
                    },
                    {
                        label: {
                            en: "close cooperation with businesses as governmental body",
                            de: "enge Zusammenarbeit mit Wirtschaftstreibenden in Funktion als Behörde"
                        }
                    },
                    {
                        label: {
                            en: "confrontation with multiple aspects of applied law",
                            de: "Einsatz in einer Vielzahl von Rechtsmaterien (u.A.: GewO, NAG, LMSVG, AWEG, AuslBG, etc.)"
                        }
                    },
                ],
                tags: ["non&#8209;tech"]
            },
            {
                label: { intl: "MA 35" },
                tagLine: {
                    en: "Immigration Office",
                    de: "Einwanderungsverfahren"
                },
                time: {
                    from: dayjs_min("12/12", DATE_FORMAT),
                    to: dayjs_min("04/15", DATE_FORMAT)
                },
                list: [
                    {
                        label: {
                            en: "politically and legally controversial matter",
                            de: "brisante politische und rechtliche Materie"
                        }
                    },
                    {
                        label: {
                            en: "challenging handling of clients",
                            de: "herausfordernder Kundenkontakt"
                        }
                    },
                    {
                        label: {
                            en: "enormous workload",
                            de: "enormes Arbeitsvolumen"
                        }
                    },
                ],
                tags: ["non&#8209;tech"]
            },
            {
                label: {
                    en: "various internships",
                    de: "diverse Praktika"
                },
                time: {
                    from: dayjs_min("06/08", DATE_FORMAT),
                    to: dayjs_min("12/12", DATE_FORMAT)
                },
                list: [
                    { label: { intl: "Vetoquinol" } },
                    {
                        label: {
                            en: "Property Management Rosenberger",
                            de: "Hausverwaltung Rosenberger"
                        }
                    },
                    { label: { intl: "Wiener Volkshochschulen" } },
                    {
                        label: {
                            en: "Archdiocese Vienna",
                            de: "Erzdiözese Wien"
                        }
                    },
                ],
                tags: ["non&#8209;tech"]
            },
        ]
    };
    var cvEduItems = {
        heading: {
            en: "Education",
            de: "Schul- und Berufsausbilungen"
        },
        items: [
            {
                label: {
                    en: "University of Applied Sciences for Management & Communication Vienna",
                    de: "FH der WKW"
                },
                time: {
                    from: dayjs_min("09/2015", DATE_FORMAT),
                    to: dayjs_min("10/2018", DATE_FORMAT)
                },
                tagLine: {
                    en: "Content Production & Digital Media Management, graduated with honors",
                    de: "Studium “Contentproduktion & digitales Medienmanagement”, Abschlussmit Auszeichnung"
                },
                tags: ["non&#8209;tech"]
            },
            {
                label: {
                    en: "Municipal department of Vienna",
                    de: "Magistrat Wien"
                },
                time: {
                    from: dayjs_min("12/2014", DATE_FORMAT),
                    to: dayjs_min("12/2014", DATE_FORMAT)
                },
                tagLine: {
                    en: "Service exam of the municipal district of Vienna (mainly public law)",
                    de: "Dienstprüfungskurs und Dienstprüfung <i>(hauptsächlich öffentliches Recht.)</i>"
                },
                tags: ["non&#8209;tech"]
            },
            {
                label: {
                    en: "University of Vienna",
                    de: "Universität Wien"
                },
                time: {
                    from: dayjs_min("09/2010", DATE_FORMAT),
                    to: dayjs_min("06/2011", DATE_FORMAT)
                },
                tagLine: {
                    en: "Catholic Theology and Latin",
                    de: "Katholische Theologie und Latein - Lehramtsstudium"
                },
                tags: ["non&#8209;tech"]
            },
            {
                label: {
                    en: "Vienna University of Economics and Business",
                    de: "Wirtschaftsuniversität Wien"
                },
                time: {
                    from: dayjs_min("09/2009", DATE_FORMAT),
                    to: dayjs_min("06/2010", DATE_FORMAT)
                },
                tagLine: {
                    en: "Economics",
                    de: "Studium der Betriebswirtschaftslehre"
                },
                tags: ["non&#8209;tech"]
            },
            {
                label: {
                    en: "University of Vienna",
                    de: "Universität Wien"
                },
                time: {
                    from: dayjs_min("09/2008", DATE_FORMAT),
                    to: dayjs_min("06/2009", DATE_FORMAT)
                },
                tagLine: {
                    en: "Catholic Theology",
                    de: "Studium der kath. Fachtheologie"
                },
                tags: ["non&#8209;tech"]
            },
            {
                label: {
                    en: "Highschool in Vienna, Austria",
                    de: "Bundesgymnasium Wien XIX"
                },
                time: {
                    from: dayjs_min("09/2000", DATE_FORMAT),
                    to: dayjs_min("06/2008", DATE_FORMAT)
                },
                tagLine: {
                    en: 'graduated with Austrian "Matura"',
                    de: "AHS Matura (humanistischer Zweig)"
                },
                tags: ["non&#8209;tech"]
            },
        ]
    };
    var skills = {
        heading: { intl: "Skills" },
        items: [
            {
                heading: { intl: "Markup" },
                items: [
                    {
                        label: { intl: "HTML" },
                        level: 5,
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "XML/JSON" },
                        level: 4,
                        tags: ["frontend", "backend"]
                    },
                    {
                        label: { intl: "JSX/TSX" },
                        level: 5,
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "Markdown" },
                        level: 4,
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "Pug" },
                        level: 4,
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "Jinja2" },
                        level: 2,
                        tags: ["frontend", "devops/sre"]
                    },
                    {
                        label: { intl: "Handlebars" },
                        level: 1,
                        tags: ["frontend"]
                    },
                ]
            },
            {
                heading: { intl: "Styles" },
                items: [
                    {
                        label: { intl: "CSS" },
                        level: 4,
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "Sass & SCSS" },
                        level: 4,
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "styled-components & emotionJS" },
                        level: 4,
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "Tailwind CSS" },
                        level: 5,
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "Material UI" },
                        level: 3,
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "Bootstrap" },
                        level: 2,
                        tags: ["frontend"]
                    },
                ]
            },
            {
                heading: { intl: "JavaScript" },
                items: [
                    {
                        label: { intl: "VanillaJS" },
                        level: 4,
                        tags: ["frontend", "backend"]
                    },
                    {
                        label: { intl: "TypeScript" },
                        level: 4,
                        tags: ["frontend", "backend"]
                    },
                    {
                        label: { intl: "jQuery" },
                        level: 2,
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "ReactJS" },
                        level: 5,
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "NodeJS" },
                        level: 3,
                        tags: ["backend"]
                    },
                    {
                        label: { intl: "ExpressJS" },
                        level: 2,
                        tags: ["backend"]
                    },
                    {
                        label: { intl: "NextJS" },
                        level: 3,
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "NestJS" },
                        level: 4,
                        tags: ["backend"]
                    },
                    {
                        label: { intl: "MongoDB" },
                        level: 3,
                        tags: ["backend"]
                    },
                    {
                        label: { intl: "nx.js" },
                        level: 2,
                        tags: ["frontend", "backend"]
                    },
                    {
                        label: { intl: "svelteJS" },
                        level: 4,
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "yew" },
                        level: 2,
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "D3.js" },
                        level: 1,
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "socketIO" },
                        level: 2,
                        tags: ["backend"]
                    },
                    {
                        label: { intl: "ThreeJS" },
                        level: 1,
                        tags: ["frontend"]
                    },
                ]
            },
            {
                heading: { de: "Weitere Skills", en: "Other skills" },
                items: [
                    {
                        label: { intl: "Python" },
                        level: 3,
                        tags: ["backend"]
                    },
                    {
                        label: { intl: "Kotlin" },
                        level: 2,
                        tags: ["backend"]
                    },
                    {
                        label: { intl: "Vim" },
                        level: 3,
                        tags: ["other"]
                    },
                    {
                        label: { intl: "AI Prompting" },
                        level: 3,
                        tags: ["other"]
                    },
                    {
                        label: {
                            de: "PHP für WordPress",
                            en: "PHP for WordPress"
                        },
                        level: 2,
                        tags: ["frontend", "backend"]
                    },
                    {
                        label: {
                            de: "technische SEO",
                            en: "technical SEO"
                        },
                        level: 3,
                        tags: ["frontend", "backend"]
                    },
                    {
                        label: { intl: "Rust" },
                        level: 2,
                        tags: ["frontend", "backend"]
                    },
                    {
                        label: { intl: "GraphQL" },
                        level: 4,
                        tags: ["frontend", "backend"]
                    },
                    {
                        label: { intl: "REST" },
                        level: 4,
                        tags: ["backend"]
                    },
                    {
                        label: { intl: "Heroku" },
                        level: 2,
                        tags: ["devops/sre"]
                    },
                    {
                        label: { intl: "Docker" },
                        level: 2,
                        tags: ["devops/sre"]
                    },
                    {
                        label: { intl: "SQL" },
                        level: 3,
                        tags: ["backend"]
                    },
                    {
                        label: { intl: "Jira" },
                        level: 4,
                        tags: ["other"]
                    },
                    {
                        label: { intl: "git" },
                        level: 4,
                        tags: ["devops/sre"]
                    },
                    {
                        label: { intl: "Gitlab" },
                        level: 3,
                        tags: ["devops/sre", "other"]
                    },
                    {
                        label: { intl: "BitBucket" },
                        level: 2,
                        tags: ["devops/sre", "other"]
                    },
                    {
                        label: { intl: "CypressJS" },
                        level: 4,
                        tags: ["tech&#8239;health"]
                    },
                    {
                        label: { intl: "SonarQube" },
                        level: 2,
                        tags: ["tech&#8239;health"]
                    },
                    {
                        label: { intl: "Grafana" },
                        level: 2,
                        tags: ["tech&#8239;health"]
                    },
                    {
                        label: { intl: "Prometheus" },
                        level: 1,
                        tags: ["tech&#8239;health"]
                    },
                    {
                        label: { intl: "Sentry" },
                        level: 2,
                        tags: ["tech&#8239;health"]
                    },
                    {
                        label: { intl: "Lighthouse" },
                        level: 4,
                        tags: ["tech&#8239;health"]
                    },
                    {
                        label: { intl: "Storybook" },
                        level: 3,
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "Agile Workflow" },
                        level: 3,
                        tags: ["other"]
                    },
                    {
                        label: { intl: "Scrum" },
                        level: 3,
                        tags: ["other"]
                    },
                    {
                        label: { intl: "Confluence" },
                        level: 3,
                        tags: ["other"]
                    },
                    {
                        label: { intl: "Notion" },
                        level: 3,
                        tags: ["other"]
                    },
                    {
                        label: { intl: "Obsidian" },
                        level: 2,
                        tags: ["other"]
                    },
                ]
            },
            {
                heading: {
                    de: "persönliche Roadmap",
                    en: "personal Roadmap"
                },
                items: [
                    { label: { intl: "Rust" }, tags: ["backend"] },
                    {
                        label: {
                            en: "Rust for WebAssembly",
                            de: "Rust für WebAssembly"
                        },
                        tags: ["frontend"]
                    },
                    {
                        label: { intl: "GameDev with Bevy" },
                        tags: ["other"]
                    },
                    { label: { intl: "Web3" }, tags: ["frontend"] },
                    {
                        label: { intl: "AutoGPT-type stuff" },
                        tags: ["other"]
                    },
                    {
                        label: { de: "Russisch", en: "Russian" },
                        tags: ["non&#8209;tech"]
                    },
                ]
            },
            {
                heading: { en: "Languages", de: "Sprachen" },
                items: [
                    {
                        label: {
                            en: "German <i>(First Language)</i>",
                            de: "Deutsch <i>(Muttersprache)</i>"
                        },
                        tags: ["non&#8209;tech"]
                    },
                    {
                        label: {
                            en: "English <i>(near-native Level)</i>",
                            de: "Englisch <i>(muttersprachliches Niveau)</i>"
                        },
                        tags: ["non&#8209;tech"]
                    },
                    {
                        label: {
                            en: "Latin <i>(very helpful)</i>",
                            de: "Latein <i>(sehr hilfreich)</i>"
                        },
                        tags: ["non&#8209;tech"]
                    },
                    {
                        label: {
                            en: "Anchient Greek <i>(even more helpful)</i>",
                            de: "Altgriechisch <i>(noch viel hilfreicher)</i>"
                        },
                        tags: ["non&#8209;tech"]
                    },
                    {
                        label: {
                            en: "Russian <i>(A2)</i>",
                            de: "Russisch <i>(A2)</i>"
                        },
                        tags: ["non&#8209;tech"]
                    },
                ]
            },
            {
                heading: {
                    en: "Skills I haven't used for a long time",
                    de: "lange nicht verwendete Skills"
                },
                items: [
                    {
                        label: { intl: "Adobe After Effects" },
                        tags: ["non&#8209;tech"]
                    },
                    {
                        label: { intl: "Adobe Illustrator" },
                        tags: ["non&#8209;tech"]
                    },
                    {
                        label: { intl: "Adobe InDesign" },
                        tags: ["non&#8209;tech"]
                    },
                    {
                        label: { intl: "Adobe Photoshop" },
                        tags: ["non&#8209;tech"]
                    },
                    {
                        label: { intl: "Blender 3D" },
                        tags: ["non&#8209;tech"]
                    },
                    {
                        label: { intl: "Godot" },
                        tags: ["non&#8209;tech"]
                    },
                ]
            },
        ]
    };
    var data = {
        introText: introText,
        cvJobItems: cvJobItems,
        cvEduItems: cvEduItems,
        skills: skills
    };

    var LevelEnum;
    (function (LevelEnum) {
        LevelEnum[LevelEnum["been confronted"] = 0] = "been confronted";
        LevelEnum[LevelEnum["used before"] = 1] = "used before";
        LevelEnum[LevelEnum["familiar"] = 2] = "familiar";
        LevelEnum[LevelEnum["well-versed"] = 3] = "well-versed";
        LevelEnum[LevelEnum["expert"] = 4] = "expert";
    })(LevelEnum || (LevelEnum = {}));
    var isSingleLanguageContentTypeGuard = function (content) {
        return content.intl !== undefined;
    };

    var filterNonTech = function (enforce, items) {
        if (!enforce) {
            return items;
        }
        return items.filter(function (_a) {
            var tags = _a.tags;
            return !tags.includes('non&#8209;tech');
        });
    };
    // handle clicks outside of DOM node
    var clickOutside = function (node) {
        var handleClick = function (event) {
            if (node &&
                !node.contains(event.target) &&
                !event.defaultPrevented) {
                node.dispatchEvent(new CustomEvent('outsideClick', node));
            }
        };
        document.addEventListener('click', handleClick, true);
        return {
            destroy: function () {
                document.removeEventListener('click', handleClick, true);
            }
        };
    };
    var getIntlContent = function (intlContent, contentLangState) {
        if (isSingleLanguageContentTypeGuard(intlContent)) {
            return intlContent.intl;
        }
        return intlContent[contentLangState];
    };

    var cvJobItemsState = writable(__assign(__assign({}, data.cvJobItems), { items: filterNonTech(HIDE_NON_TECH_INITIALLY, data.cvJobItems.items) }));
    var cvEduItemsState = writable(__assign(__assign({}, data.cvEduItems), { items: filterNonTech(HIDE_NON_TECH_INITIALLY, data.cvEduItems.items) }));
    var skillsState = writable(__assign(__assign({}, data.skills), { items: data.skills.items.map(function (skill) { return (__assign(__assign({}, skill), { items: filterNonTech(HIDE_NON_TECH_INITIALLY, skill.items) })); }) }));

    var activeFiltersState = writable([]);
    var skillLevelFilterState = writable(1);
    var hideNonTechState = writable(HIDE_NON_TECH_INITIALLY);
    var compareFiltersToItems = function (items, filters) {
        if (!filters.length) {
            return items;
        }
        var newItems = items.filter(function (_a) {
            var tags = _a.tags;
            var inter = tags.filter(function (tag) {
                return filters.includes(tag);
            });
            return Boolean(inter.length);
        });
        return newItems;
    };
    var filterData = function (filters, hideNonTechState) {
        cvJobItemsState.set(__assign(__assign({}, data.cvJobItems), { items: filterNonTech(hideNonTechState, compareFiltersToItems(data.cvJobItems.items, filters)) }));
        cvEduItemsState.set(__assign(__assign({}, data.cvEduItems), { items: filterNonTech(hideNonTechState, compareFiltersToItems(data.cvEduItems.items, filters)) }));
        skillsState.set(__assign(__assign({}, data.skills), { items: data.skills.items.map(function (skill) { return (__assign(__assign({}, skill), { items: filterNonTech(hideNonTechState, compareFiltersToItems(skill.items, filters)) })); }) }));
    };
    var filterSkills = function (n) {
        skillLevelFilterState.set(n);
        skillsState.set(__assign(__assign({}, data.skills), { items: data.skills.items.map(function (skill) { return (__assign(__assign({}, skill), { items: skill.items.filter(function (_a) {
                    var level = _a.level;
                    return level >= n || !level;
                }) })); }) }));
    };

    var showSidebarState = writable(false);
    var contentLangState = writable('en');
    var showModalState = writable();
    var openModalWithValues = function (modal) {
        showModalState.update(function (state) {
            if (state === undefined) {
                return modal;
            }
            return state;
        });
    };
    var closeModal = function () {
        showModalState.set(undefined);
    };

    var subTitle = {
        en: 'Curriculum Vitæ',
        de: 'Lebenslauf'
    };
    var since = {
        en: 'since',
        de: 'seit'
    };
    var email = {
        en: 'email',
        de: 'E-Mail Adresse'
    };
    var linkedIn = {
        en: 'LinkedIn profile',
        de: 'LinkedIn Profil'
    };
    var tagsFilterLabel = {
        en: 'filter by tags',
        de: 'nach Schlagworten filtern'
    };
    var skillLevelFilterLabel = {
        en: 'only show skills with following self-assessment (or higher)',
        de: 'nur Skills mit folgender Selbsteinschätzung (und höher) anzeigen'
    };
    var nonTechFilterLabel = {
        en: 'hide non-tech',
        de: 'non-tech verstecken'
    };
    var contactMe = {
        en: 'Do you think I might be a good fit for your company? I am open for something new!',
        de: 'Glaubst Du, wir würden gut zusammen passen? Ich bin offen für etwas Neues!'
    };

    /* src/components/Buttons/NonTechFilter.svelte generated by Svelte v3.59.2 */
    const file$k = "src/components/Buttons/NonTechFilter.svelte";

    function create_fragment$k(ctx) {
    	let label;
    	let input;
    	let t0;
    	let span;
    	let t1_value = getIntlContent(nonTechFilterLabel, /*$contentLangState*/ ctx[1]) + "";
    	let t1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			span = element("span");
    			t1 = text(t1_value);
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "name", "hideNonTechState");
    			attr_dev(input, "class", "toggle-primary toggle");
    			add_location(input, file$k, 11, 2, 437);
    			attr_dev(span, "class", "label-text");
    			add_location(span, file$k, 18, 2, 597);
    			attr_dev(label, "class", "label cursor-pointer");
    			add_location(label, file$k, 10, 0, 398);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, input);
    			input.checked = /*$hideNonTechState*/ ctx[0];
    			append_dev(label, t0);
    			append_dev(label, span);
    			append_dev(span, t1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler*/ ctx[3]),
    					listen_dev(input, "click", /*handleClick*/ ctx[2], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$hideNonTechState*/ 1) {
    				input.checked = /*$hideNonTechState*/ ctx[0];
    			}

    			if (dirty & /*$contentLangState*/ 2 && t1_value !== (t1_value = getIntlContent(nonTechFilterLabel, /*$contentLangState*/ ctx[1]) + "")) set_data_dev(t1, t1_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let $hideNonTechState;
    	let $activeFiltersState;
    	let $contentLangState;
    	validate_store(hideNonTechState, 'hideNonTechState');
    	component_subscribe($$self, hideNonTechState, $$value => $$invalidate(0, $hideNonTechState = $$value));
    	validate_store(activeFiltersState, 'activeFiltersState');
    	component_subscribe($$self, activeFiltersState, $$value => $$invalidate(4, $activeFiltersState = $$value));
    	validate_store(contentLangState, 'contentLangState');
    	component_subscribe($$self, contentLangState, $$value => $$invalidate(1, $contentLangState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NonTechFilter', slots, []);

    	const handleClick = () => {
    		hideNonTechState.update(s => !s);
    		filterData($activeFiltersState, $hideNonTechState);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NonTechFilter> was created with unknown prop '${key}'`);
    	});

    	function input_change_handler() {
    		$hideNonTechState = this.checked;
    		hideNonTechState.set($hideNonTechState);
    	}

    	$$self.$capture_state = () => ({
    		activeFiltersState,
    		filterData,
    		hideNonTechState,
    		contentLangState,
    		nonTechFilterLabel,
    		getIntlContent,
    		handleClick,
    		$hideNonTechState,
    		$activeFiltersState,
    		$contentLangState
    	});

    	return [$hideNonTechState, $contentLangState, handleClick, input_change_handler];
    }

    class NonTechFilter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NonTechFilter",
    			options,
    			id: create_fragment$k.name
    		});
    	}
    }

    /* src/components/Buttons/SkilllevelFilter.svelte generated by Svelte v3.59.2 */
    const file$j = "src/components/Buttons/SkilllevelFilter.svelte";

    function get_each_context$a(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (20:4) {#each skillLevels as n}
    function create_each_block$a(ctx) {
    	let button;
    	let i;
    	let t;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[3](/*n*/ ctx[4]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			i = element("i");
    			t = space();
    			attr_dev(i, "class", "ph-star");
    			toggle_class(i, "ph-light", /*$skillLevelFilterState*/ ctx[1] < /*n*/ ctx[4]);
    			toggle_class(i, "ph-fill", /*$skillLevelFilterState*/ ctx[1] >= /*n*/ ctx[4]);
    			add_location(i, file$j, 21, 8, 612);
    			add_location(button, file$j, 20, 6, 562);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, i);
    			append_dev(button, t);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", click_handler, false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*$skillLevelFilterState, skillLevels*/ 6) {
    				toggle_class(i, "ph-light", /*$skillLevelFilterState*/ ctx[1] < /*n*/ ctx[4]);
    			}

    			if (dirty & /*$skillLevelFilterState, skillLevels*/ 6) {
    				toggle_class(i, "ph-fill", /*$skillLevelFilterState*/ ctx[1] >= /*n*/ ctx[4]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$a.name,
    		type: "each",
    		source: "(20:4) {#each skillLevels as n}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$j(ctx) {
    	let div1;
    	let p;
    	let t0_value = getIntlContent(skillLevelFilterLabel, /*$contentLangState*/ ctx[0]) + "";
    	let t0;
    	let t1;
    	let div0;
    	let div0_title_value;
    	let each_value = /*skillLevels*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$a(get_each_context$a(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(p, "class", "pb-4");
    			add_location(p, file$j, 9, 2, 347);
    			attr_dev(div0, "title", div0_title_value = LevelEnum[/*$skillLevelFilterState*/ ctx[1]]);
    			attr_dev(div0, "class", "flex");
    			add_location(div0, file$j, 15, 2, 455);
    			add_location(div1, file$j, 8, 0, 339);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, p);
    			append_dev(p, t0);
    			append_dev(div1, t1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div0, null);
    				}
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$contentLangState*/ 1 && t0_value !== (t0_value = getIntlContent(skillLevelFilterLabel, /*$contentLangState*/ ctx[0]) + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*filterSkills, skillLevels, $skillLevelFilterState*/ 6) {
    				each_value = /*skillLevels*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$a(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$a(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*$skillLevelFilterState*/ 2 && div0_title_value !== (div0_title_value = LevelEnum[/*$skillLevelFilterState*/ ctx[1]])) {
    				attr_dev(div0, "title", div0_title_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let $contentLangState;
    	let $skillLevelFilterState;
    	validate_store(contentLangState, 'contentLangState');
    	component_subscribe($$self, contentLangState, $$value => $$invalidate(0, $contentLangState = $$value));
    	validate_store(skillLevelFilterState, 'skillLevelFilterState');
    	component_subscribe($$self, skillLevelFilterState, $$value => $$invalidate(1, $skillLevelFilterState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SkilllevelFilter', slots, []);
    	const skillLevels = [0, 1, 2, 3, 4];
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SkilllevelFilter> was created with unknown prop '${key}'`);
    	});

    	const click_handler = n => filterSkills(n);

    	$$self.$capture_state = () => ({
    		filterSkills,
    		skillLevelFilterState,
    		contentLangState,
    		LevelEnum,
    		skillLevelFilterLabel,
    		getIntlContent,
    		skillLevels,
    		$contentLangState,
    		$skillLevelFilterState
    	});

    	return [$contentLangState, $skillLevelFilterState, skillLevels, click_handler];
    }

    class SkilllevelFilter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SkilllevelFilter",
    			options,
    			id: create_fragment$j.name
    		});
    	}
    }

    /* src/components/Buttons/Tag.svelte generated by Svelte v3.59.2 */
    const file$i = "src/components/Buttons/Tag.svelte";

    function create_fragment$i(ctx) {
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			attr_dev(button, "class", "badge m-1 select-none");
    			toggle_class(button, "badge-sm", /*size*/ ctx[0] === 's');
    			toggle_class(button, "badge-md", /*size*/ ctx[0] === 'm');
    			toggle_class(button, "badge-secondary", /*isActive*/ ctx[2]);
    			toggle_class(button, "badge-primary", !/*isActive*/ ctx[2]);
    			add_location(button, file$i, 17, 0, 552);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			button.innerHTML = /*tag*/ ctx[1];

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[5], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*tag*/ 2) button.innerHTML = /*tag*/ ctx[1];
    			if (dirty & /*size*/ 1) {
    				toggle_class(button, "badge-sm", /*size*/ ctx[0] === 's');
    			}

    			if (dirty & /*size*/ 1) {
    				toggle_class(button, "badge-md", /*size*/ ctx[0] === 'm');
    			}

    			if (dirty & /*isActive*/ 4) {
    				toggle_class(button, "badge-secondary", /*isActive*/ ctx[2]);
    			}

    			if (dirty & /*isActive*/ 4) {
    				toggle_class(button, "badge-primary", !/*isActive*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let isActive;
    	let $hideNonTechState;
    	let $activeFiltersState;
    	validate_store(hideNonTechState, 'hideNonTechState');
    	component_subscribe($$self, hideNonTechState, $$value => $$invalidate(6, $hideNonTechState = $$value));
    	validate_store(activeFiltersState, 'activeFiltersState');
    	component_subscribe($$self, activeFiltersState, $$value => $$invalidate(4, $activeFiltersState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tag', slots, []);
    	let { size = 'm' } = $$props;
    	let { tag } = $$props;

    	// todo: belongs to the store
    	const toggleFilter = (tag, isActive) => {
    		activeFiltersState.update(filters => {
    			if (isActive) {
    				return filters.filter(f => f !== tag);
    			}

    			return [tag, ...filters];
    		});

    		filterData($activeFiltersState, $hideNonTechState);
    	};

    	$$self.$$.on_mount.push(function () {
    		if (tag === undefined && !('tag' in $$props || $$self.$$.bound[$$self.$$.props['tag']])) {
    			console.warn("<Tag> was created without expected prop 'tag'");
    		}
    	});

    	const writable_props = ['size', 'tag'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tag> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => toggleFilter(tag, isActive);

    	$$self.$$set = $$props => {
    		if ('size' in $$props) $$invalidate(0, size = $$props.size);
    		if ('tag' in $$props) $$invalidate(1, tag = $$props.tag);
    	};

    	$$self.$capture_state = () => ({
    		activeFiltersState,
    		filterData,
    		hideNonTechState,
    		size,
    		tag,
    		toggleFilter,
    		isActive,
    		$hideNonTechState,
    		$activeFiltersState
    	});

    	$$self.$inject_state = $$props => {
    		if ('size' in $$props) $$invalidate(0, size = $$props.size);
    		if ('tag' in $$props) $$invalidate(1, tag = $$props.tag);
    		if ('isActive' in $$props) $$invalidate(2, isActive = $$props.isActive);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$activeFiltersState, tag*/ 18) {
    			$$invalidate(2, isActive = Boolean($activeFiltersState.find(f => f === tag)));
    		}
    	};

    	return [size, tag, isActive, toggleFilter, $activeFiltersState, click_handler];
    }

    class Tag extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { size: 0, tag: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tag",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get size() {
    		throw new Error("<Tag>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Tag>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tag() {
    		throw new Error("<Tag>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tag(value) {
    		throw new Error("<Tag>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Buttons/TagsFilter.svelte generated by Svelte v3.59.2 */
    const file$h = "src/components/Buttons/TagsFilter.svelte";

    function get_each_context$9(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (13:4) {#each ALL_TAGS as tag}
    function create_each_block$9(ctx) {
    	let tag;
    	let current;

    	tag = new Tag({
    			props: { tag: /*tag*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(tag.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tag, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tag.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tag.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tag, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$9.name,
    		type: "each",
    		source: "(13:4) {#each ALL_TAGS as tag}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let div1;
    	let p;
    	let t0_value = getIntlContent(tagsFilterLabel, /*$contentLangState*/ ctx[0]) + "";
    	let t0;
    	let t1;
    	let div0;
    	let current;
    	let each_value = ALL_TAGS;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$9(get_each_context$9(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(p, "class", "pb-4");
    			add_location(p, file$h, 8, 2, 266);
    			attr_dev(div0, "class", "flex flex-wrap gap-2");
    			add_location(div0, file$h, 11, 2, 349);
    			add_location(div1, file$h, 7, 0, 258);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, p);
    			append_dev(p, t0);
    			append_dev(div1, t1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div0, null);
    				}
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*$contentLangState*/ 1) && t0_value !== (t0_value = getIntlContent(tagsFilterLabel, /*$contentLangState*/ ctx[0]) + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*ALL_TAGS*/ 0) {
    				each_value = ALL_TAGS;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$9(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$9(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
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
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let $contentLangState;
    	validate_store(contentLangState, 'contentLangState');
    	component_subscribe($$self, contentLangState, $$value => $$invalidate(0, $contentLangState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TagsFilter', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TagsFilter> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		tagsFilterLabel,
    		getIntlContent,
    		ALL_TAGS,
    		contentLangState,
    		Tag,
    		$contentLangState
    	});

    	return [$contentLangState];
    }

    class TagsFilter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TagsFilter",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* src/components/FilterSidebar.svelte generated by Svelte v3.59.2 */
    const file$g = "src/components/FilterSidebar.svelte";

    function create_fragment$g(ctx) {
    	let div1;
    	let div0;
    	let tagsfilter;
    	let t0;
    	let skilllevelfilter;
    	let t1;
    	let nontechfilter;
    	let current;
    	let mounted;
    	let dispose;
    	tagsfilter = new TagsFilter({ $$inline: true });
    	skilllevelfilter = new SkilllevelFilter({ $$inline: true });
    	nontechfilter = new NonTechFilter({ $$inline: true });

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			create_component(tagsfilter.$$.fragment);
    			t0 = space();
    			create_component(skilllevelfilter.$$.fragment);
    			t1 = space();
    			create_component(nontechfilter.$$.fragment);
    			attr_dev(div0, "class", "flex h-2/3 flex-col justify-between");
    			add_location(div0, file$g, 14, 2, 581);
    			attr_dev(div1, "class", "fixed bottom-0 right-0 top-0 z-40 flex h-screen w-80 flex-col rounded-l-md bg-base-100 p-8 transition-transform");
    			toggle_class(div1, "translate-x-80", !/*showSidebar*/ ctx[0]);
    			add_location(div1, file$g, 8, 0, 339);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			mount_component(tagsfilter, div0, null);
    			append_dev(div0, t0);
    			mount_component(skilllevelfilter, div0, null);
    			append_dev(div0, t1);
    			mount_component(nontechfilter, div0, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(clickOutside.call(null, div1)),
    					listen_dev(div1, "outsideClick", /*outsideClick_handler*/ ctx[2], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*showSidebar*/ 1) {
    				toggle_class(div1, "translate-x-80", !/*showSidebar*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tagsfilter.$$.fragment, local);
    			transition_in(skilllevelfilter.$$.fragment, local);
    			transition_in(nontechfilter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tagsfilter.$$.fragment, local);
    			transition_out(skilllevelfilter.$$.fragment, local);
    			transition_out(nontechfilter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(tagsfilter);
    			destroy_component(skilllevelfilter);
    			destroy_component(nontechfilter);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let showSidebar;
    	let $showSidebarState;
    	validate_store(showSidebarState, 'showSidebarState');
    	component_subscribe($$self, showSidebarState, $$value => $$invalidate(1, $showSidebarState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FilterSidebar', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FilterSidebar> was created with unknown prop '${key}'`);
    	});

    	const outsideClick_handler = () => showSidebarState.set(false);

    	$$self.$capture_state = () => ({
    		NonTechFilter,
    		clickOutside,
    		showSidebarState,
    		SkilllevelFilter,
    		TagsFilter,
    		showSidebar,
    		$showSidebarState
    	});

    	$$self.$inject_state = $$props => {
    		if ('showSidebar' in $$props) $$invalidate(0, showSidebar = $$props.showSidebar);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$showSidebarState*/ 2) {
    			$$invalidate(0, showSidebar = $showSidebarState);
    		}
    	};

    	return [showSidebar, $showSidebarState, outsideClick_handler];
    }

    class FilterSidebar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FilterSidebar",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* src/components/Footer.svelte generated by Svelte v3.59.2 */
    const file$f = "src/components/Footer.svelte";

    function create_fragment$f(ctx) {
    	let footer;
    	let p;
    	let t0_value = getIntlContent(contactMe, /*$contentLangState*/ ctx[0]) + "";
    	let t0;
    	let t1;
    	let a0;
    	let t3;
    	let a1;
    	let t4_value = getIntlContent(linkedIn, /*$contentLangState*/ ctx[0]) + "";
    	let t4;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			a0 = element("a");
    			a0.textContent = "mail@vomkonstant.in";
    			t3 = space();
    			a1 = element("a");
    			t4 = text(t4_value);
    			attr_dev(a0, "href", "mailto:mail@vomkonstant.in");
    			add_location(a0, file$f, 11, 4, 368);
    			attr_dev(a1, "class", "print:hidden");
    			attr_dev(a1, "href", "https://www.linkedin.com/in/konstantin-kovar-5301494b/");
    			add_location(a1, file$f, 14, 4, 445);
    			attr_dev(p, "class", "mx-auto");
    			add_location(p, file$f, 9, 2, 293);
    			attr_dev(footer, "class", "footer footer-center mt-8 bg-base-300 p-8 text-base-content print:bg-white print:text-black");
    			add_location(footer, file$f, 6, 0, 179);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, p);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, a0);
    			append_dev(p, t3);
    			append_dev(p, a1);
    			append_dev(a1, t4);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$contentLangState*/ 1 && t0_value !== (t0_value = getIntlContent(contactMe, /*$contentLangState*/ ctx[0]) + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*$contentLangState*/ 1 && t4_value !== (t4_value = getIntlContent(linkedIn, /*$contentLangState*/ ctx[0]) + "")) set_data_dev(t4, t4_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let $contentLangState;
    	validate_store(contentLangState, 'contentLangState');
    	component_subscribe($$self, contentLangState, $$value => $$invalidate(0, $contentLangState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		contentLangState,
    		contactMe,
    		email,
    		linkedIn,
    		getIntlContent,
    		$contentLangState
    	});

    	return [$contentLangState];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src/components/Hero.svelte generated by Svelte v3.59.2 */
    const file$e = "src/components/Hero.svelte";

    function get_each_context$8(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (54:2) {#if $activeFiltersState.length}
    function create_if_block_2$2(ctx) {
    	let p;
    	let t1;
    	let ul;
    	let each_value = /*$activeFiltersState*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$8(get_each_context$8(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "The following filters have been activated:";
    			t1 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(p, file$e, 54, 4, 1752);
    			add_location(ul, file$e, 55, 4, 1806);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ul, null);
    				}
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$activeFiltersState*/ 4) {
    				each_value = /*$activeFiltersState*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$8(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$8(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(54:2) {#if $activeFiltersState.length}",
    		ctx
    	});

    	return block;
    }

    // (57:6) {#each $activeFiltersState as filter}
    function create_each_block$8(ctx) {
    	let li;
    	let t_value = /*filter*/ ctx[7] + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			add_location(li, file$e, 57, 8, 1863);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$activeFiltersState*/ 4 && t_value !== (t_value = /*filter*/ ctx[7] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$8.name,
    		type: "each",
    		source: "(57:6) {#each $activeFiltersState as filter}",
    		ctx
    	});

    	return block;
    }

    // (63:2) {#if $skillLevelFilterState > 1}
    function create_if_block_1$2(ctx) {
    	let p;
    	let t0;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("Only skills with an (self-assessed) skill level of ");
    			t1 = text(/*$skillLevelFilterState*/ ctx[3]);
    			t2 = text("/5\n      are being displayed.");
    			add_location(p, file$e, 63, 4, 1953);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$skillLevelFilterState*/ 8) set_data_dev(t1, /*$skillLevelFilterState*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(63:2) {#if $skillLevelFilterState > 1}",
    		ctx
    	});

    	return block;
    }

    // (70:2) {#if $hideNonTechState}
    function create_if_block$9(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Non-tech items are being hidden.";
    			add_location(p, file$e, 70, 4, 2116);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(70:2) {#if $hideNonTechState}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let section0;
    	let button;
    	let i;
    	let t0;
    	let div0;
    	let h10;
    	let t1;
    	let br;
    	let t2;
    	let t3;
    	let subtitle0;
    	let raw0_value = getIntlContent(subTitle, /*$contentLangState*/ ctx[1]) + "";
    	let div0_style_value;
    	let t4;
    	let div1;
    	let t5;
    	let section1;
    	let h11;
    	let t7;
    	let subtitle1;
    	let raw1_value = getIntlContent(subTitle, /*$contentLangState*/ ctx[1]) + "";
    	let t8;
    	let div2;
    	let t9;
    	let p;
    	let t10;
    	let b;
    	let t12;
    	let t13;
    	let t14;
    	let t15;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowscroll*/ ctx[5]);
    	let if_block0 = /*$activeFiltersState*/ ctx[2].length && create_if_block_2$2(ctx);
    	let if_block1 = /*$skillLevelFilterState*/ ctx[3] > 1 && create_if_block_1$2(ctx);
    	let if_block2 = /*$hideNonTechState*/ ctx[4] && create_if_block$9(ctx);

    	const block = {
    		c: function create() {
    			section0 = element("section");
    			button = element("button");
    			i = element("i");
    			t0 = space();
    			div0 = element("div");
    			h10 = element("h1");
    			t1 = text("Konstantin");
    			br = element("br");
    			t2 = text("Kovar");
    			t3 = space();
    			subtitle0 = element("subtitle");
    			t4 = space();
    			div1 = element("div");
    			t5 = space();
    			section1 = element("section");
    			h11 = element("h1");
    			h11.textContent = "Konstantin Kovar";
    			t7 = space();
    			subtitle1 = element("subtitle");
    			t8 = space();
    			div2 = element("div");
    			t9 = space();
    			p = element("p");
    			t10 = text("Disclaimer: This document was generated from an\n    intercative website and might not display the full\n    content. Please visit ");
    			b = element("b");
    			b.textContent = "https://konstantin-kovar-cv.vercel.app\"";
    			t12 = text("\n    to view the whole document.");
    			t13 = space();
    			if (if_block0) if_block0.c();
    			t14 = space();
    			if (if_block1) if_block1.c();
    			t15 = space();
    			if (if_block2) if_block2.c();
    			attr_dev(i, "class", "ph-bold ph-translate");
    			add_location(i, file$e, 20, 4, 719);
    			attr_dev(button, "class", "btn-secondary btn-outline btn absolute right-6 top-6 z-20 h-12 w-12 rounded-full text-xl text-white");
    			add_location(button, file$e, 13, 2, 491);
    			add_location(br, file$e, 27, 16, 944);
    			attr_dev(h10, "class", "text-7xl lg:text-[20rem]");
    			add_location(h10, file$e, 26, 4, 890);
    			attr_dev(subtitle0, "class", "text-3xl lg:text-[8rem]");
    			add_location(subtitle0, file$e, 29, 4, 970);
    			attr_dev(div0, "class", "ml-2 leading-[8rem] lg:px-32 lg:leading-[18rem]");
    			attr_dev(div0, "style", div0_style_value = `transform: translateY(${/*y*/ ctx[0] / 6}px);`);
    			add_location(div0, file$e, 22, 2, 768);
    			attr_dev(div1, "class", "absolute bottom-0 h-2/5 w-full bg-[url('../img/hero.png')] bg-cover bg-right bg-no-repeat lg:h-3/5");
    			add_location(div1, file$e, 33, 2, 1098);
    			attr_dev(section0, "class", "relative flex h-screen w-screen flex-col overflow-hidden bg-base-100 pt-[30vh] shadow-2xl print:hidden lg:justify-end lg:pt-0");
    			add_location(section0, file$e, 10, 0, 342);
    			add_location(h11, file$e, 40, 2, 1310);
    			attr_dev(subtitle1, "class", "text-3xl");
    			add_location(subtitle1, file$e, 41, 2, 1338);
    			attr_dev(div2, "class", "text-xs text-gray-400");
    			add_location(div2, file$e, 44, 2, 1438);
    			add_location(b, file$e, 48, 26, 1615);
    			add_location(p, file$e, 45, 2, 1478);
    			attr_dev(section1, "class", "mt-8 hidden text-center print:block");
    			add_location(section1, file$e, 39, 0, 1254);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section0, anchor);
    			append_dev(section0, button);
    			append_dev(button, i);
    			append_dev(section0, t0);
    			append_dev(section0, div0);
    			append_dev(div0, h10);
    			append_dev(h10, t1);
    			append_dev(h10, br);
    			append_dev(h10, t2);
    			append_dev(div0, t3);
    			append_dev(div0, subtitle0);
    			subtitle0.innerHTML = raw0_value;
    			append_dev(section0, t4);
    			append_dev(section0, div1);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, section1, anchor);
    			append_dev(section1, h11);
    			append_dev(section1, t7);
    			append_dev(section1, subtitle1);
    			subtitle1.innerHTML = raw1_value;
    			append_dev(section1, t8);
    			append_dev(section1, div2);
    			append_dev(section1, t9);
    			append_dev(section1, p);
    			append_dev(p, t10);
    			append_dev(p, b);
    			append_dev(p, t12);
    			append_dev(section1, t13);
    			if (if_block0) if_block0.m(section1, null);
    			append_dev(section1, t14);
    			if (if_block1) if_block1.m(section1, null);
    			append_dev(section1, t15);
    			if (if_block2) if_block2.m(section1, null);

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "scroll", () => {
    						scrolling = true;
    						clearTimeout(scrolling_timeout);
    						scrolling_timeout = setTimeout(clear_scrolling, 100);
    						/*onwindowscroll*/ ctx[5]();
    					}),
    					listen_dev(button, "click", /*click_handler*/ ctx[6], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*y*/ 1 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(window.pageXOffset, /*y*/ ctx[0]);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    			}

    			if (dirty & /*$contentLangState*/ 2 && raw0_value !== (raw0_value = getIntlContent(subTitle, /*$contentLangState*/ ctx[1]) + "")) subtitle0.innerHTML = raw0_value;
    			if (dirty & /*y*/ 1 && div0_style_value !== (div0_style_value = `transform: translateY(${/*y*/ ctx[0] / 6}px);`)) {
    				attr_dev(div0, "style", div0_style_value);
    			}

    			if (dirty & /*$contentLangState*/ 2 && raw1_value !== (raw1_value = getIntlContent(subTitle, /*$contentLangState*/ ctx[1]) + "")) subtitle1.innerHTML = raw1_value;
    			if (/*$activeFiltersState*/ ctx[2].length) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_2$2(ctx);
    					if_block0.c();
    					if_block0.m(section1, t14);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*$skillLevelFilterState*/ ctx[3] > 1) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_1$2(ctx);
    					if_block1.c();
    					if_block1.m(section1, t15);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*$hideNonTechState*/ ctx[4]) {
    				if (if_block2) ; else {
    					if_block2 = create_if_block$9(ctx);
    					if_block2.c();
    					if_block2.m(section1, null);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section0);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(section1);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let $contentLangState;
    	let $activeFiltersState;
    	let $skillLevelFilterState;
    	let $hideNonTechState;
    	validate_store(contentLangState, 'contentLangState');
    	component_subscribe($$self, contentLangState, $$value => $$invalidate(1, $contentLangState = $$value));
    	validate_store(activeFiltersState, 'activeFiltersState');
    	component_subscribe($$self, activeFiltersState, $$value => $$invalidate(2, $activeFiltersState = $$value));
    	validate_store(skillLevelFilterState, 'skillLevelFilterState');
    	component_subscribe($$self, skillLevelFilterState, $$value => $$invalidate(3, $skillLevelFilterState = $$value));
    	validate_store(hideNonTechState, 'hideNonTechState');
    	component_subscribe($$self, hideNonTechState, $$value => $$invalidate(4, $hideNonTechState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Hero', slots, []);
    	let y = 0;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Hero> was created with unknown prop '${key}'`);
    	});

    	function onwindowscroll() {
    		$$invalidate(0, y = window.pageYOffset);
    	}

    	const click_handler = () => contentLangState.update(s => s === 'de' ? 'en' : 'de');

    	$$self.$capture_state = () => ({
    		activeFiltersState,
    		hideNonTechState,
    		skillLevelFilterState,
    		contentLangState,
    		subTitle,
    		getIntlContent,
    		y,
    		$contentLangState,
    		$activeFiltersState,
    		$skillLevelFilterState,
    		$hideNonTechState
    	});

    	$$self.$inject_state = $$props => {
    		if ('y' in $$props) $$invalidate(0, y = $$props.y);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		y,
    		$contentLangState,
    		$activeFiltersState,
    		$skillLevelFilterState,
    		$hideNonTechState,
    		onwindowscroll,
    		click_handler
    	];
    }

    class Hero extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Hero",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src/components/SectionHeading.svelte generated by Svelte v3.59.2 */

    const file$d = "src/components/SectionHeading.svelte";

    function create_fragment$d(ctx) {
    	let h20;
    	let t;
    	let h21;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);
    	const default_slot_template_1 = /*#slots*/ ctx[1].default;
    	const default_slot_1 = create_slot(default_slot_template_1, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			h20 = element("h2");
    			if (default_slot) default_slot.c();
    			t = space();
    			h21 = element("h2");
    			if (default_slot_1) default_slot_1.c();
    			attr_dev(h20, "class", "mx-auto my-8 max-w-fit text-xl font-bold print:hidden lg:mb-24 lg:mt-12 xl:max-w-4xl");
    			add_location(h20, file$d, 0, 0, 0);
    			attr_dev(h21, "class", "ml-4 hidden text-2xl font-bold print:block");
    			add_location(h21, file$d, 7, 0, 142);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h20, anchor);

    			if (default_slot) {
    				default_slot.m(h20, null);
    			}

    			insert_dev(target, t, anchor);
    			insert_dev(target, h21, anchor);

    			if (default_slot_1) {
    				default_slot_1.m(h21, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}

    			if (default_slot_1) {
    				if (default_slot_1.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot_1,
    						default_slot_template_1,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template_1, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			transition_in(default_slot_1, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			transition_out(default_slot_1, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h20);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(h21);
    			if (default_slot_1) default_slot_1.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SectionHeading', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SectionHeading> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class SectionHeading extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SectionHeading",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    function t(){let t,e="",n=0;for(;n<arguments.length;)(t=arguments[n++])&&"string"==typeof t&&(e&&(e+=" "),e+=t);return e}

    /* src/components/Time.svelte generated by Svelte v3.59.2 */
    const file$c = "src/components/Time.svelte";

    // (13:0) {:else}
    function create_else_block(ctx) {
    	let t0;
    	let span;
    	let t2;
    	let if_block1_anchor;
    	let if_block0 = !/*to*/ ctx[1] && create_if_block_2$1(ctx);
    	let if_block1 = /*to*/ ctx[1] && create_if_block_1$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			span = element("span");
    			span.textContent = `${/*from*/ ctx[2].format(DATE_FORMAT)}`;
    			t2 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    			add_location(span, file$c, 16, 2, 458);
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, span, anchor);
    			insert_dev(target, t2, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (!/*to*/ ctx[1]) if_block0.p(ctx, dirty);
    			if (/*to*/ ctx[1]) if_block1.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t2);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(13:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (11:0) {#if dayjs(to).isSame(from)}
    function create_if_block$8(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = `${/*from*/ ctx[2].format(DATE_FORMAT)}`;
    			add_location(span, file$c, 11, 2, 324);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(11:0) {#if dayjs(to).isSame(from)}",
    		ctx
    	});

    	return block;
    }

    // (14:2) {#if !to}
    function create_if_block_2$1(ctx) {
    	let span;
    	let t_value = getIntlContent(since, /*$contentLangState*/ ctx[0]) + "";
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(t_value);
    			add_location(span, file$c, 13, 11, 383);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$contentLangState*/ 1 && t_value !== (t_value = getIntlContent(since, /*$contentLangState*/ ctx[0]) + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(14:2) {#if !to}",
    		ctx
    	});

    	return block;
    }

    // (18:2) {#if to}
    function create_if_block_1$1(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = `${` - ${/*to*/ ctx[1].format(DATE_FORMAT)}`}`;
    			add_location(span, file$c, 17, 10, 508);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(18:2) {#if to}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (dayjs_min(/*to*/ ctx[1]).isSame(/*from*/ ctx[2])) return create_if_block$8;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if_block.p(ctx, dirty);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let $contentLangState;
    	validate_store(contentLangState, 'contentLangState');
    	component_subscribe($$self, contentLangState, $$value => $$invalidate(0, $contentLangState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Time', slots, []);
    	let { time } = $$props;
    	const { to, from } = time;

    	$$self.$$.on_mount.push(function () {
    		if (time === undefined && !('time' in $$props || $$self.$$.bound[$$self.$$.props['time']])) {
    			console.warn("<Time> was created without expected prop 'time'");
    		}
    	});

    	const writable_props = ['time'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Time> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('time' in $$props) $$invalidate(3, time = $$props.time);
    	};

    	$$self.$capture_state = () => ({
    		DATE_FORMAT,
    		dayjs: dayjs_min,
    		getIntlContent,
    		since,
    		contentLangState,
    		time,
    		to,
    		from,
    		$contentLangState
    	});

    	$$self.$inject_state = $$props => {
    		if ('time' in $$props) $$invalidate(3, time = $$props.time);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$contentLangState, to, from, time];
    }

    class Time extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { time: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Time",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get time() {
    		throw new Error("<Time>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set time(value) {
    		throw new Error("<Time>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/CvItems/CvItem.svelte generated by Svelte v3.59.2 */

    const { Boolean: Boolean_1 } = globals;
    const file$b = "src/components/CvItems/CvItem.svelte";

    function get_each_context$7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	child_ctx[10] = i;
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	return child_ctx;
    }

    // (16:6) {#if tags}
    function create_if_block_4(ctx) {
    	let ul;
    	let current;
    	let each_value_1 = /*tags*/ ctx[5];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "flex h-10 flex-row items-stretch overflow-x-scroll border-primary pr-4 lg:mr-8 lg:h-auto lg:flex-col lg:overflow-x-hidden lg:border-r-4 lg:pr-8");
    			add_location(ul, file$b, 16, 8, 532);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ul, null);
    				}
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tags*/ 32) {
    				each_value_1 = /*tags*/ ctx[5];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean_1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(16:6) {#if tags}",
    		ctx
    	});

    	return block;
    }

    // (20:10) {#each tags as tag}
    function create_each_block_1$1(ctx) {
    	let li;
    	let tag;
    	let t;
    	let current;

    	tag = new Tag({
    			props: { tag: /*tag*/ ctx[11] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			li = element("li");
    			create_component(tag.$$.fragment);
    			t = space();
    			add_location(li, file$b, 20, 12, 750);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			mount_component(tag, li, null);
    			append_dev(li, t);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tag.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tag.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(tag);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(20:10) {#each tags as tag}",
    		ctx
    	});

    	return block;
    }

    // (37:8) {#if Boolean(tagLine)}
    function create_if_block_3(ctx) {
    	let p;
    	let raw_value = getIntlContent(/*tagLine*/ ctx[3], /*$contentLangState*/ ctx[0]) + "";

    	const block = {
    		c: function create() {
    			p = element("p");
    			attr_dev(p, "class", "font-cover w-2/3");
    			add_location(p, file$b, 37, 10, 1273);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			p.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$contentLangState*/ 1 && raw_value !== (raw_value = getIntlContent(/*tagLine*/ ctx[3], /*$contentLangState*/ ctx[0]) + "")) p.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(37:8) {#if Boolean(tagLine)}",
    		ctx
    	});

    	return block;
    }

    // (48:4) {#if list && list.length}
    function create_if_block_2(ctx) {
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "Details";
    			attr_dev(button, "class", "btn-primary btn-outline btn mb-0 mt-8 max-w-xs lg:ml-auto");
    			add_location(button, file$b, 48, 6, 1499);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[7], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(48:4) {#if list && list.length}",
    		ctx
    	});

    	return block;
    }

    // (73:2) {#if Boolean(tagLine)}
    function create_if_block_1(ctx) {
    	let p;
    	let raw_value = getIntlContent(/*tagLine*/ ctx[3], /*$contentLangState*/ ctx[0]) + "";

    	const block = {
    		c: function create() {
    			p = element("p");
    			attr_dev(p, "class", "w-1/3");
    			add_location(p, file$b, 73, 4, 2081);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			p.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$contentLangState*/ 1 && raw_value !== (raw_value = getIntlContent(/*tagLine*/ ctx[3], /*$contentLangState*/ ctx[0]) + "")) p.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(73:2) {#if Boolean(tagLine)}",
    		ctx
    	});

    	return block;
    }

    // (79:2) {#if list && list.length}
    function create_if_block$7(ctx) {
    	let ul;
    	let each_value = /*list*/ ctx[4];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "list-inside list-disc py-4");
    			add_location(ul, file$b, 79, 4, 2223);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ul, null);
    				}
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*cx, getIntlContent, list, $contentLangState*/ 17) {
    				each_value = /*list*/ ctx[4];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$7(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$7(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(79:2) {#if list && list.length}",
    		ctx
    	});

    	return block;
    }

    // (81:6) {#each list as listItem, index}
    function create_each_block$7(ctx) {
    	let li;
    	let span;
    	let raw_value = getIntlContent(/*listItem*/ ctx[8].label, /*$contentLangState*/ ctx[0]) + "";
    	let t$1;

    	const block = {
    		c: function create() {
    			li = element("li");
    			span = element("span");
    			t$1 = space();
    			add_location(span, file$b, 87, 10, 2452);
    			attr_dev(li, "class", t('my-2 ml-4 list-item', /*index*/ ctx[10] % 2 !== 0 && 'border-gray-200'));
    			add_location(li, file$b, 81, 8, 2309);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, span);
    			span.innerHTML = raw_value;
    			append_dev(li, t$1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$contentLangState*/ 1 && raw_value !== (raw_value = getIntlContent(/*listItem*/ ctx[8].label, /*$contentLangState*/ ctx[0]) + "")) span.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$7.name,
    		type: "each",
    		source: "(81:6) {#each list as listItem, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let article;
    	let div3;
    	let div2;
    	let t0;
    	let div1;
    	let h30;
    	let raw0_value = getIntlContent(/*label*/ ctx[1], /*$contentLangState*/ ctx[0]) + "";
    	let t1;
    	let div0;
    	let time0;
    	let t2;
    	let show_if_1 = Boolean(/*tagLine*/ ctx[3]);
    	let t3;
    	let t4;
    	let div4;
    	let h31;
    	let raw1_value = getIntlContent(/*label*/ ctx[1], /*$contentLangState*/ ctx[0]) + "";
    	let t5;
    	let show_if = Boolean(/*tagLine*/ ctx[3]);
    	let t6;
    	let time1;
    	let t7;
    	let current;
    	let if_block0 = /*tags*/ ctx[5] && create_if_block_4(ctx);

    	time0 = new Time({
    			props: { time: /*time*/ ctx[2] },
    			$$inline: true
    		});

    	let if_block1 = show_if_1 && create_if_block_3(ctx);
    	let if_block2 = /*list*/ ctx[4] && /*list*/ ctx[4].length && create_if_block_2(ctx);
    	let if_block3 = show_if && create_if_block_1(ctx);

    	time1 = new Time({
    			props: { time: /*time*/ ctx[2] },
    			$$inline: true
    		});

    	let if_block4 = /*list*/ ctx[4] && /*list*/ ctx[4].length && create_if_block$7(ctx);

    	const block = {
    		c: function create() {
    			article = element("article");
    			div3 = element("div");
    			div2 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			div1 = element("div");
    			h30 = element("h3");
    			t1 = space();
    			div0 = element("div");
    			create_component(time0.$$.fragment);
    			t2 = space();
    			if (if_block1) if_block1.c();
    			t3 = space();
    			if (if_block2) if_block2.c();
    			t4 = space();
    			div4 = element("div");
    			h31 = element("h3");
    			t5 = space();
    			if (if_block3) if_block3.c();
    			t6 = space();
    			create_component(time1.$$.fragment);
    			t7 = space();
    			if (if_block4) if_block4.c();
    			attr_dev(h30, "class", "h3 w-2/3 font-bold leading-none");
    			add_location(h30, file$b, 28, 8, 909);
    			attr_dev(div0, "class", "absolute right-4 top-4 w-1/4 rotate-90 text-2xl font-bold opacity-60 print:static print:rotate-0 md:rotate-0 md:text-right");
    			add_location(div0, file$b, 31, 8, 1035);
    			attr_dev(div1, "class", "relative mt-4 flex w-full flex-col");
    			add_location(div1, file$b, 27, 6, 852);
    			attr_dev(div2, "class", "flex flex-col lg:flex-row");
    			add_location(div2, file$b, 14, 4, 467);
    			attr_dev(div3, "class", "flex flex-col");
    			add_location(div3, file$b, 13, 2, 435);
    			attr_dev(article, "class", "relative z-10 mx-4 rounded-xl bg-base-100 p-8 print:hidden lg:mx-0");
    			add_location(article, file$b, 10, 0, 345);
    			attr_dev(h31, "class", "font-cover text-xl");
    			add_location(h31, file$b, 69, 2, 1959);
    			attr_dev(div4, "class", "hidden break-inside-avoid print:block");
    			add_location(div4, file$b, 68, 0, 1905);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, div3);
    			append_dev(div3, div2);
    			if (if_block0) if_block0.m(div2, null);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, h30);
    			h30.innerHTML = raw0_value;
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			mount_component(time0, div0, null);
    			append_dev(div1, t2);
    			if (if_block1) if_block1.m(div1, null);
    			append_dev(div3, t3);
    			if (if_block2) if_block2.m(div3, null);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, h31);
    			h31.innerHTML = raw1_value;
    			append_dev(div4, t5);
    			if (if_block3) if_block3.m(div4, null);
    			append_dev(div4, t6);
    			mount_component(time1, div4, null);
    			append_dev(div4, t7);
    			if (if_block4) if_block4.m(div4, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*tags*/ ctx[5]) if_block0.p(ctx, dirty);
    			if ((!current || dirty & /*$contentLangState*/ 1) && raw0_value !== (raw0_value = getIntlContent(/*label*/ ctx[1], /*$contentLangState*/ ctx[0]) + "")) h30.innerHTML = raw0_value;			if (show_if_1) if_block1.p(ctx, dirty);
    			if (/*list*/ ctx[4] && /*list*/ ctx[4].length) if_block2.p(ctx, dirty);
    			if ((!current || dirty & /*$contentLangState*/ 1) && raw1_value !== (raw1_value = getIntlContent(/*label*/ ctx[1], /*$contentLangState*/ ctx[0]) + "")) h31.innerHTML = raw1_value;			if (show_if) if_block3.p(ctx, dirty);
    			if (/*list*/ ctx[4] && /*list*/ ctx[4].length) if_block4.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(time0.$$.fragment, local);
    			transition_in(time1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(time0.$$.fragment, local);
    			transition_out(time1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    			if (if_block0) if_block0.d();
    			destroy_component(time0);
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div4);
    			if (if_block3) if_block3.d();
    			destroy_component(time1);
    			if (if_block4) if_block4.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let $contentLangState;
    	validate_store(contentLangState, 'contentLangState');
    	component_subscribe($$self, contentLangState, $$value => $$invalidate(0, $contentLangState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CvItem', slots, []);
    	let { cvItem } = $$props;
    	let { label, time, tagLine, list, tags } = cvItem;

    	$$self.$$.on_mount.push(function () {
    		if (cvItem === undefined && !('cvItem' in $$props || $$self.$$.bound[$$self.$$.props['cvItem']])) {
    			console.warn("<CvItem> was created without expected prop 'cvItem'");
    		}
    	});

    	const writable_props = ['cvItem'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CvItem> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => openModalWithValues({
    		list,
    		heading: getIntlContent(label, $contentLangState),
    		tags,
    		time
    	});

    	$$self.$$set = $$props => {
    		if ('cvItem' in $$props) $$invalidate(6, cvItem = $$props.cvItem);
    	};

    	$$self.$capture_state = () => ({
    		cx: t,
    		Time,
    		getIntlContent,
    		contentLangState,
    		openModalWithValues,
    		Tag,
    		cvItem,
    		label,
    		time,
    		tagLine,
    		list,
    		tags,
    		$contentLangState
    	});

    	$$self.$inject_state = $$props => {
    		if ('cvItem' in $$props) $$invalidate(6, cvItem = $$props.cvItem);
    		if ('label' in $$props) $$invalidate(1, label = $$props.label);
    		if ('time' in $$props) $$invalidate(2, time = $$props.time);
    		if ('tagLine' in $$props) $$invalidate(3, tagLine = $$props.tagLine);
    		if ('list' in $$props) $$invalidate(4, list = $$props.list);
    		if ('tags' in $$props) $$invalidate(5, tags = $$props.tags);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$contentLangState, label, time, tagLine, list, tags, cvItem, click_handler];
    }

    class CvItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { cvItem: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CvItem",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get cvItem() {
    		throw new Error("<CvItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cvItem(value) {
    		throw new Error("<CvItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/CvItems/CvItems.svelte generated by Svelte v3.59.2 */
    const file$a = "src/components/CvItems/CvItems.svelte";

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (11:0) {#if items && items.length}
    function create_if_block$6(ctx) {
    	let sectionheading;
    	let t;
    	let ul;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let current;

    	sectionheading = new SectionHeading({
    			props: {
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let each_value = /*items*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*cvItem*/ ctx[4];
    	validate_each_keys(ctx, each_value, get_each_context$6, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$6(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$6(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			create_component(sectionheading.$$.fragment);
    			t = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "mx-auto max-w-4xl");
    			add_location(ul, file$a, 14, 2, 446);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sectionheading, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ul, null);
    				}
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const sectionheading_changes = {};

    			if (dirty & /*$$scope, heading, $contentLangState*/ 134) {
    				sectionheading_changes.$$scope = { dirty, ctx };
    			}

    			sectionheading.$set(sectionheading_changes);

    			if (dirty & /*items*/ 1) {
    				each_value = /*items*/ ctx[0];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$6, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, ul, outro_and_destroy_block, create_each_block$6, null, get_each_context$6);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sectionheading.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sectionheading.$$.fragment, local);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sectionheading, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(11:0) {#if items && items.length}",
    		ctx
    	});

    	return block;
    }

    // (12:2) <SectionHeading>
    function create_default_slot$2(ctx) {
    	let html_tag;
    	let raw_value = getIntlContent(/*heading*/ ctx[1], /*$contentLangState*/ ctx[2]) + "";
    	let html_anchor;

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag(false);
    			html_anchor = empty();
    			html_tag.a = html_anchor;
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*heading, $contentLangState*/ 6 && raw_value !== (raw_value = getIntlContent(/*heading*/ ctx[1], /*$contentLangState*/ ctx[2]) + "")) html_tag.p(raw_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(12:2) <SectionHeading>",
    		ctx
    	});

    	return block;
    }

    // (16:4) {#each items as cvItem (cvItem)}
    function create_each_block$6(key_1, ctx) {
    	let li;
    	let cvitem;
    	let t;
    	let current;

    	cvitem = new CvItem({
    			props: { cvItem: /*cvItem*/ ctx[4] },
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			li = element("li");
    			create_component(cvitem.$$.fragment);
    			t = space();
    			attr_dev(li, "class", "mb-8");
    			add_location(li, file$a, 16, 6, 520);
    			this.first = li;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			mount_component(cvitem, li, null);
    			append_dev(li, t);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const cvitem_changes = {};
    			if (dirty & /*items*/ 1) cvitem_changes.cvItem = /*cvItem*/ ctx[4];
    			cvitem.$set(cvitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cvitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cvitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(cvitem);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(16:4) {#each items as cvItem (cvItem)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*items*/ ctx[0] && /*items*/ ctx[0].length && create_if_block$6(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*items*/ ctx[0] && /*items*/ ctx[0].length) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*items*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
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
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let heading;
    	let items;
    	let $contentLangState;
    	validate_store(contentLangState, 'contentLangState');
    	component_subscribe($$self, contentLangState, $$value => $$invalidate(2, $contentLangState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CvItems', slots, []);
    	let { cvItems } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (cvItems === undefined && !('cvItems' in $$props || $$self.$$.bound[$$self.$$.props['cvItems']])) {
    			console.warn("<CvItems> was created without expected prop 'cvItems'");
    		}
    	});

    	const writable_props = ['cvItems'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CvItems> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('cvItems' in $$props) $$invalidate(3, cvItems = $$props.cvItems);
    	};

    	$$self.$capture_state = () => ({
    		SectionHeading,
    		CvItem,
    		getIntlContent,
    		contentLangState,
    		cvItems,
    		items,
    		heading,
    		$contentLangState
    	});

    	$$self.$inject_state = $$props => {
    		if ('cvItems' in $$props) $$invalidate(3, cvItems = $$props.cvItems);
    		if ('items' in $$props) $$invalidate(0, items = $$props.items);
    		if ('heading' in $$props) $$invalidate(1, heading = $$props.heading);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*cvItems*/ 8) {
    			$$invalidate(1, heading = cvItems.heading);
    		}

    		if ($$self.$$.dirty & /*cvItems*/ 8) {
    			$$invalidate(0, items = cvItems.items);
    		}
    	};

    	return [items, heading, $contentLangState, cvItems];
    }

    class CvItems extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { cvItems: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CvItems",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get cvItems() {
    		throw new Error("<CvItems>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cvItems(value) {
    		throw new Error("<CvItems>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Skills/Level.svelte generated by Svelte v3.59.2 */
    const file$9 = "src/components/Skills/Level.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (7:0) {#if level !== undefined}
    function create_if_block$5(ctx) {
    	let div0;
    	let div0_title_value;
    	let t0;
    	let div1;
    	let span;
    	let t1_value = `${/*level*/ ctx[0] + 1}/5` + "";
    	let t1;
    	let each_value = [0, 1, 2, 3, 4];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < 5; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div0 = element("div");

    			for (let i = 0; i < 5; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			div1 = element("div");
    			span = element("span");
    			t1 = text(t1_value);
    			attr_dev(div0, "title", div0_title_value = LevelEnum[/*level*/ ctx[0]]);
    			attr_dev(div0, "class", "print:hidden");
    			add_location(div0, file$9, 7, 2, 187);
    			add_location(span, file$9, 19, 4, 483);
    			attr_dev(div1, "class", "hidden print:block");
    			add_location(div1, file$9, 18, 2, 446);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);

    			for (let i = 0; i < 5; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div0, null);
    				}
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, span);
    			append_dev(span, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*level*/ 1) {
    				each_value = [0, 1, 2, 3, 4];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < 5; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < 5; i += 1) {
    					each_blocks[i].d(1);
    				}
    			}

    			if (dirty & /*level*/ 1 && div0_title_value !== (div0_title_value = LevelEnum[/*level*/ ctx[0]])) {
    				attr_dev(div0, "title", div0_title_value);
    			}

    			if (dirty & /*level*/ 1 && t1_value !== (t1_value = `${/*level*/ ctx[0] + 1}/5` + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(7:0) {#if level !== undefined}",
    		ctx
    	});

    	return block;
    }

    // (9:4) {#each [0, 1, 2, 3, 4] as n}
    function create_each_block$5(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			attr_dev(i, "class", "ph-star mr-1 h-8 w-8");
    			toggle_class(i, "ph-light", /*level*/ ctx[0] < /*n*/ ctx[1]);
    			toggle_class(i, "ph-fill", /*level*/ ctx[0] >= /*n*/ ctx[1]);
    			add_location(i, file$9, 9, 6, 278);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*level*/ 1) {
    				toggle_class(i, "ph-light", /*level*/ ctx[0] < /*n*/ ctx[1]);
    			}

    			if (dirty & /*level*/ 1) {
    				toggle_class(i, "ph-fill", /*level*/ ctx[0] >= /*n*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(9:4) {#each [0, 1, 2, 3, 4] as n}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let if_block_anchor;
    	let if_block = /*level*/ ctx[0] !== undefined && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*level*/ ctx[0] !== undefined) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Level', slots, []);
    	let { level } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (level === undefined && !('level' in $$props || $$self.$$.bound[$$self.$$.props['level']])) {
    			console.warn("<Level> was created without expected prop 'level'");
    		}
    	});

    	const writable_props = ['level'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Level> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('level' in $$props) $$invalidate(0, level = $$props.level);
    	};

    	$$self.$capture_state = () => ({ LevelEnum, level });

    	$$self.$inject_state = $$props => {
    		if ('level' in $$props) $$invalidate(0, level = $$props.level);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [level];
    }

    class Level extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { level: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Level",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get level() {
    		throw new Error("<Level>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set level(value) {
    		throw new Error("<Level>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Skills/Legend.svelte generated by Svelte v3.59.2 */
    const file$8 = "src/components/Skills/Legend.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	return child_ctx;
    }

    // (9:4) {#each [0, 1, 2, 3, 4] as n}
    function create_each_block$4(ctx) {
    	let div;
    	let level;
    	let t0;
    	let span;
    	let t1_value = LevelEnum[/*n*/ ctx[0]] + "";
    	let t1;
    	let t2;
    	let current;

    	level = new Level({
    			props: { level: /*n*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(level.$$.fragment);
    			t0 = space();
    			span = element("span");
    			t1 = text(t1_value);
    			t2 = space();
    			add_location(span, file$8, 13, 8, 437);
    			attr_dev(div, "class", "join-item flex flex-col items-center bg-base-300 p-4 print:bg-white print:text-black");
    			add_location(div, file$8, 9, 6, 287);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(level, div, null);
    			append_dev(div, t0);
    			append_dev(div, span);
    			append_dev(span, t1);
    			append_dev(div, t2);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(level.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(level.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(level);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(9:4) {#each [0, 1, 2, 3, 4] as n}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let div1;
    	let div0;
    	let current;
    	let each_value = [0, 1, 2, 3, 4];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < 5; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < 5; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "join join-vertical max-w-4xl lg:join-horizontal print:bg-white print:text-black");
    			add_location(div0, file$8, 5, 2, 147);
    			attr_dev(div1, "class", "mb-8 flex justify-center");
    			add_location(div1, file$8, 4, 0, 106);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			for (let i = 0; i < 5; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div0, null);
    				}
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*LevelEnum*/ 0) {
    				each_value = [0, 1, 2, 3, 4];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < 5; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = 5; i < 5; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < 5; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < 5; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Legend', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Legend> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ LevelEnum, Level });
    	return [];
    }

    class Legend extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Legend",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/components/Skills/SkillListItem.svelte generated by Svelte v3.59.2 */
    const file$7 = "src/components/Skills/SkillListItem.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (13:0) {#if tags && tags.length}
    function create_if_block$4(ctx) {
    	let dd;
    	let ul;
    	let t;
    	let level_1;
    	let current;
    	let each_value = /*tags*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	level_1 = new Level({
    			props: { level: /*level*/ ctx[2] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			dd = element("dd");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			create_component(level_1.$$.fragment);
    			attr_dev(ul, "class", "flex flex-row-reverse print:hidden");
    			add_location(ul, file$7, 14, 4, 465);
    			attr_dev(dd, "class", "ml-4 flex max-w-full items-center");
    			add_location(dd, file$7, 13, 2, 414);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, dd, anchor);
    			append_dev(dd, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ul, null);
    				}
    			}

    			append_dev(dd, t);
    			mount_component(level_1, dd, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tags*/ 8) {
    				each_value = /*tags*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
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

    			transition_in(level_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(level_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(dd);
    			destroy_each(each_blocks, detaching);
    			destroy_component(level_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(13:0) {#if tags && tags.length}",
    		ctx
    	});

    	return block;
    }

    // (16:6) {#each tags as tag}
    function create_each_block$3(ctx) {
    	let li;
    	let tag;
    	let t;
    	let current;

    	tag = new Tag({
    			props: { tag: /*tag*/ ctx[5] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			li = element("li");
    			create_component(tag.$$.fragment);
    			t = space();
    			add_location(li, file$7, 16, 8, 547);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			mount_component(tag, li, null);
    			append_dev(li, t);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tag.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tag.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(tag);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(16:6) {#each tags as tag}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let dt;
    	let raw_value = getIntlContent(/*label*/ ctx[1], /*$contentLangState*/ ctx[0]) + "";
    	let t;
    	let if_block_anchor;
    	let current;
    	let if_block = /*tags*/ ctx[3] && /*tags*/ ctx[3].length && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			dt = element("dt");
    			t = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			attr_dev(dt, "class", "line-clamp-1 shrink text-ellipsis");
    			add_location(dt, file$7, 9, 0, 282);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, dt, anchor);
    			dt.innerHTML = raw_value;
    			insert_dev(target, t, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*$contentLangState*/ 1) && raw_value !== (raw_value = getIntlContent(/*label*/ ctx[1], /*$contentLangState*/ ctx[0]) + "")) dt.innerHTML = raw_value;			if (/*tags*/ ctx[3] && /*tags*/ ctx[3].length) if_block.p(ctx, dirty);
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
    			if (detaching) detach_dev(dt);
    			if (detaching) detach_dev(t);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
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
    	let $contentLangState;
    	validate_store(contentLangState, 'contentLangState');
    	component_subscribe($$self, contentLangState, $$value => $$invalidate(0, $contentLangState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SkillListItem', slots, []);
    	let { item } = $$props;
    	const { label, level, tags } = item;

    	$$self.$$.on_mount.push(function () {
    		if (item === undefined && !('item' in $$props || $$self.$$.bound[$$self.$$.props['item']])) {
    			console.warn("<SkillListItem> was created without expected prop 'item'");
    		}
    	});

    	const writable_props = ['item'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SkillListItem> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('item' in $$props) $$invalidate(4, item = $$props.item);
    	};

    	$$self.$capture_state = () => ({
    		contentLangState,
    		Tag,
    		getIntlContent,
    		Level,
    		item,
    		label,
    		level,
    		tags,
    		$contentLangState
    	});

    	$$self.$inject_state = $$props => {
    		if ('item' in $$props) $$invalidate(4, item = $$props.item);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$contentLangState, label, level, tags, item];
    }

    class SkillListItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { item: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SkillListItem",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get item() {
    		throw new Error("<SkillListItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set item(value) {
    		throw new Error("<SkillListItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Skills/SkillList.svelte generated by Svelte v3.59.2 */
    const file$6 = "src/components/Skills/SkillList.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	child_ctx[3] = i;
    	return child_ctx;
    }

    // (7:2) {#each items as item, index}
    function create_each_block$2(ctx) {
    	let dl;
    	let skilllistitem;
    	let current;

    	skilllistitem = new SkillListItem({
    			props: { item: /*item*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			dl = element("dl");
    			create_component(skilllistitem.$$.fragment);
    			attr_dev(dl, "class", "flex items-center justify-between rounded-lg px-2 py-1 odd:bg-primary/20 print:mx-1 print:w-1/4 print:break-inside-avoid print:border-t-2 print:border-gray-300 print:bg-transparent print:first:border-0");
    			add_location(dl, file$6, 7, 4, 202);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, dl, anchor);
    			mount_component(skilllistitem, dl, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const skilllistitem_changes = {};
    			if (dirty & /*items*/ 1) skilllistitem_changes.item = /*item*/ ctx[1];
    			skilllistitem.$set(skilllistitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(skilllistitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(skilllistitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(dl);
    			destroy_component(skilllistitem);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(7:2) {#each items as item, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div;
    	let current;
    	let each_value = /*items*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "px-8 print:flex print:flex-wrap");
    			add_location(div, file$6, 5, 0, 121);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div, null);
    				}
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*items*/ 1) {
    				each_value = /*items*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SkillList', slots, []);
    	let { items } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (items === undefined && !('items' in $$props || $$self.$$.bound[$$self.$$.props['items']])) {
    			console.warn("<SkillList> was created without expected prop 'items'");
    		}
    	});

    	const writable_props = ['items'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SkillList> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('items' in $$props) $$invalidate(0, items = $$props.items);
    	};

    	$$self.$capture_state = () => ({ SkillListItem, items });

    	$$self.$inject_state = $$props => {
    		if ('items' in $$props) $$invalidate(0, items = $$props.items);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [items];
    }

    class SkillList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { items: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SkillList",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get items() {
    		throw new Error("<SkillList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<SkillList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Skills/Skill.svelte generated by Svelte v3.59.2 */
    const file$5 = "src/components/Skills/Skill.svelte";

    // (9:0) {#if items && items.length}
    function create_if_block$3(ctx) {
    	let section;
    	let h2;
    	let raw_value = getIntlContent(/*heading*/ ctx[1], /*$contentLangState*/ ctx[0]) + "";
    	let t;
    	let skilllist;
    	let current;

    	skilllist = new SkillList({
    			props: { items: /*items*/ ctx[2] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			section = element("section");
    			h2 = element("h2");
    			t = space();
    			create_component(skilllist.$$.fragment);
    			attr_dev(h2, "class", "ml-8 text-2xl font-bold");
    			add_location(h2, file$5, 12, 4, 358);
    			attr_dev(section, "class", "min-w-[40%] grow print:break-inside-avoid");
    			add_location(section, file$5, 9, 2, 287);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h2);
    			h2.innerHTML = raw_value;
    			append_dev(section, t);
    			mount_component(skilllist, section, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*$contentLangState*/ 1) && raw_value !== (raw_value = getIntlContent(/*heading*/ ctx[1], /*$contentLangState*/ ctx[0]) + "")) h2.innerHTML = raw_value;		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(skilllist.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(skilllist.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(skilllist);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(9:0) {#if items && items.length}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*items*/ ctx[2] && /*items*/ ctx[2].length && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*items*/ ctx[2] && /*items*/ ctx[2].length) if_block.p(ctx, dirty);
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
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
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
    	let $contentLangState;
    	validate_store(contentLangState, 'contentLangState');
    	component_subscribe($$self, contentLangState, $$value => $$invalidate(0, $contentLangState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Skill', slots, []);
    	let { skill } = $$props;
    	const { heading, items } = skill;

    	$$self.$$.on_mount.push(function () {
    		if (skill === undefined && !('skill' in $$props || $$self.$$.bound[$$self.$$.props['skill']])) {
    			console.warn("<Skill> was created without expected prop 'skill'");
    		}
    	});

    	const writable_props = ['skill'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Skill> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('skill' in $$props) $$invalidate(3, skill = $$props.skill);
    	};

    	$$self.$capture_state = () => ({
    		getIntlContent,
    		SkillList,
    		contentLangState,
    		skill,
    		heading,
    		items,
    		$contentLangState
    	});

    	$$self.$inject_state = $$props => {
    		if ('skill' in $$props) $$invalidate(3, skill = $$props.skill);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$contentLangState, heading, items, skill];
    }

    class Skill extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { skill: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Skill",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get skill() {
    		throw new Error("<Skill>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set skill(value) {
    		throw new Error("<Skill>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Skills/Skills.svelte generated by Svelte v3.59.2 */
    const file$4 = "src/components/Skills/Skills.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (12:2) {#if items && items.length}
    function create_if_block$2(ctx) {
    	let sectionheading;
    	let t0;
    	let legend;
    	let t1;
    	let div;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let current;

    	sectionheading = new SectionHeading({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	legend = new Legend({ $$inline: true });
    	let each_value = /*items*/ ctx[1];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*skill*/ ctx[3];
    	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$1(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			create_component(sectionheading.$$.fragment);
    			t0 = space();
    			create_component(legend.$$.fragment);
    			t1 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "mx-auto flex flex-wrap gap-4 print:ml-4 print:w-full print:flex-col lg:w-2/3");
    			add_location(div, file$4, 19, 4, 546);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sectionheading, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(legend, target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div, null);
    				}
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const sectionheading_changes = {};

    			if (dirty & /*$$scope, skills, $contentLangState*/ 69) {
    				sectionheading_changes.$$scope = { dirty, ctx };
    			}

    			sectionheading.$set(sectionheading_changes);

    			if (dirty & /*items*/ 2) {
    				each_value = /*items*/ ctx[1];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, outro_and_destroy_block, create_each_block$1, null, get_each_context$1);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sectionheading.$$.fragment, local);
    			transition_in(legend.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sectionheading.$$.fragment, local);
    			transition_out(legend.$$.fragment, local);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sectionheading, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(legend, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(12:2) {#if items && items.length}",
    		ctx
    	});

    	return block;
    }

    // (13:4) <SectionHeading>
    function create_default_slot$1(ctx) {
    	let html_tag;
    	let raw_value = getIntlContent(/*skills*/ ctx[0].heading, /*$contentLangState*/ ctx[2]) + "";
    	let html_anchor;

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag(false);
    			html_anchor = empty();
    			html_tag.a = html_anchor;
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*skills, $contentLangState*/ 5 && raw_value !== (raw_value = getIntlContent(/*skills*/ ctx[0].heading, /*$contentLangState*/ ctx[2]) + "")) html_tag.p(raw_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(13:4) <SectionHeading>",
    		ctx
    	});

    	return block;
    }

    // (23:6) {#each items as skill (skill)}
    function create_each_block$1(key_1, ctx) {
    	let first;
    	let skill;
    	let current;

    	skill = new Skill({
    			props: { skill: /*skill*/ ctx[3] },
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(skill.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(skill, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const skill_changes = {};
    			if (dirty & /*items*/ 2) skill_changes.skill = /*skill*/ ctx[3];
    			skill.$set(skill_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(skill.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(skill.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(skill, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(23:6) {#each items as skill (skill)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div;
    	let current;
    	let if_block = /*items*/ ctx[1] && /*items*/ ctx[1].length && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "print:break-inside-avoid");
    			add_location(div, file$4, 10, 0, 326);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*items*/ ctx[1] && /*items*/ ctx[1].length) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*items*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$2(ctx);
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
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
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
    	let items;
    	let $contentLangState;
    	validate_store(contentLangState, 'contentLangState');
    	component_subscribe($$self, contentLangState, $$value => $$invalidate(2, $contentLangState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Skills', slots, []);
    	let { skills } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (skills === undefined && !('skills' in $$props || $$self.$$.bound[$$self.$$.props['skills']])) {
    			console.warn("<Skills> was created without expected prop 'skills'");
    		}
    	});

    	const writable_props = ['skills'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Skills> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('skills' in $$props) $$invalidate(0, skills = $$props.skills);
    	};

    	$$self.$capture_state = () => ({
    		SectionHeading,
    		Legend,
    		Skill,
    		getIntlContent,
    		contentLangState,
    		skills,
    		items,
    		$contentLangState
    	});

    	$$self.$inject_state = $$props => {
    		if ('skills' in $$props) $$invalidate(0, skills = $$props.skills);
    		if ('items' in $$props) $$invalidate(1, items = $$props.items);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*skills*/ 1) {
    			$$invalidate(1, items = skills.items);
    		}
    	};

    	return [skills, items, $contentLangState];
    }

    class Skills extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { skills: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Skills",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get skills() {
    		throw new Error("<Skills>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set skills(value) {
    		throw new Error("<Skills>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function circIn(t) {
        return 1.0 - Math.sqrt(1.0 - t * t);
    }
    function circOut(t) {
        return Math.sqrt(1 - --t * t);
    }
    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        const [xValue, xUnit] = split_css_unit(x);
        const [yValue, yUnit] = split_css_unit(y);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});
			opacity: ${target_opacity - (od * u)}`
        };
    }

    /* src/components/DetailsCard.svelte generated by Svelte v3.59.2 */
    const file$3 = "src/components/DetailsCard.svelte";

    function create_fragment$3(ctx) {
    	let section;
    	let div;
    	let div_class_value;
    	let section_class_value;
    	let section_intro;
    	let section_outro;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			section = element("section");
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", div_class_value = `z-10 h-full text-base-content ${/*innerClassName*/ ctx[2]}`);
    			add_location(div, file$3, 22, 2, 551);
    			attr_dev(section, "class", section_class_value = `relative z-30 h-full min-h-max w-full overflow-hidden rounded-xl bg-base-200/70 p-8 shadow-xl shadow-base-300 backdrop-blur-md ${/*className*/ ctx[1]}`);
    			add_location(section, file$3, 7, 0, 200);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*innerClassName*/ 4 && div_class_value !== (div_class_value = `z-10 h-full text-base-content ${/*innerClassName*/ ctx[2]}`)) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*className*/ 2 && section_class_value !== (section_class_value = `relative z-30 h-full min-h-max w-full overflow-hidden rounded-xl bg-base-200/70 p-8 shadow-xl shadow-base-300 backdrop-blur-md ${/*className*/ ctx[1]}`)) {
    				attr_dev(section, "class", section_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);

    			add_render_callback(() => {
    				if (!current) return;
    				if (section_outro) section_outro.end(1);

    				section_intro = create_in_transition(section, fly, {
    					y: 300,
    					duration: 200,
    					delay: 100 * /*index*/ ctx[0],
    					easing: circOut
    				});

    				section_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			if (section_intro) section_intro.invalidate();

    			section_outro = create_out_transition(section, fly, {
    				y: -300,
    				duration: 125,
    				delay: 75 * /*index*/ ctx[0],
    				easing: circIn
    			});

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching && section_outro) section_outro.end();
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DetailsCard', slots, ['default']);
    	let { index = 0 } = $$props;
    	let { className = '' } = $$props;
    	let { innerClassName = '' } = $$props;
    	const writable_props = ['index', 'className', 'innerClassName'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DetailsCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('index' in $$props) $$invalidate(0, index = $$props.index);
    		if ('className' in $$props) $$invalidate(1, className = $$props.className);
    		if ('innerClassName' in $$props) $$invalidate(2, innerClassName = $$props.innerClassName);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		circIn,
    		circOut,
    		fly,
    		index,
    		className,
    		innerClassName
    	});

    	$$self.$inject_state = $$props => {
    		if ('index' in $$props) $$invalidate(0, index = $$props.index);
    		if ('className' in $$props) $$invalidate(1, className = $$props.className);
    		if ('innerClassName' in $$props) $$invalidate(2, innerClassName = $$props.innerClassName);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [index, className, innerClassName, $$scope, slots];
    }

    class DetailsCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			index: 0,
    			className: 1,
    			innerClassName: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DetailsCard",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get index() {
    		throw new Error("<DetailsCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set index(value) {
    		throw new Error("<DetailsCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get className() {
    		throw new Error("<DetailsCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set className(value) {
    		throw new Error("<DetailsCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get innerClassName() {
    		throw new Error("<DetailsCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set innerClassName(value) {
    		throw new Error("<DetailsCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/DetailsModal.svelte generated by Svelte v3.59.2 */
    const file$2 = "src/components/DetailsModal.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	child_ctx[8] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	child_ctx[8] = i;
    	return child_ctx;
    }

    // (39:6) <DetailsCard         index={2}         className="w-full relative col-span-1 bg-secondary/40 row-span-3"         >
    function create_default_slot_3(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*heading*/ ctx[3]);
    			attr_dev(span, "class", "max-w-fit origin-right -rotate-90 border-l-8 border-secondary pl-4 text-2xl font-bold xl:relative xl:rotate-0 xl:border-l-4");
    			add_location(span, file$2, 41, 9, 1269);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*heading*/ 8) set_data_dev(t, /*heading*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(39:6) <DetailsCard         index={2}         className=\\\"w-full relative col-span-1 bg-secondary/40 row-span-3\\\"         >",
    		ctx
    	});

    	return block;
    }

    // (51:8) {#if list && list.length}
    function create_if_block$1(ctx) {
    	let ul;
    	let current;
    	let each_value_1 = /*list*/ ctx[0];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(ul, file$2, 51, 10, 1606);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ul, null);
    				}
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*getIntlContent, list, $contentLangState*/ 17) {
    				each_value_1 = /*list*/ ctx[0];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
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
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(51:8) {#if list && list.length}",
    		ctx
    	});

    	return block;
    }

    // (53:12) {#each list as item, index}
    function create_each_block_1(ctx) {
    	let li;
    	let html_tag;
    	let raw_value = getIntlContent(/*item*/ ctx[9].label, /*$contentLangState*/ ctx[4]) + "";
    	let t;
    	let li_intro;
    	let li_outro;
    	let current;

    	const block = {
    		c: function create() {
    			li = element("li");
    			html_tag = new HtmlTag(false);
    			t = space();
    			html_tag.a = t;
    			attr_dev(li, "class", "flex h-20 items-center border-b-2 border-base-content first:border-t-2");
    			add_location(li, file$2, 53, 14, 1665);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			html_tag.m(raw_value, li);
    			append_dev(li, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*list, $contentLangState*/ 17) && raw_value !== (raw_value = getIntlContent(/*item*/ ctx[9].label, /*$contentLangState*/ ctx[4]) + "")) html_tag.p(raw_value);
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!current) return;
    				if (li_outro) li_outro.end(1);

    				li_intro = create_in_transition(li, fly, {
    					x: 100,
    					delay: 50 * /*index*/ ctx[8] + 300
    				});

    				li_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (li_intro) li_intro.invalidate();

    			li_outro = create_out_transition(li, fly, {
    				x: 100,
    				delay: 30 * /*index*/ ctx[8],
    				duration: 100
    			});

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (detaching && li_outro) li_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(53:12) {#each list as item, index}",
    		ctx
    	});

    	return block;
    }

    // (47:6) <DetailsCard         index={1}         className="col-span-2 row-span-4"       >
    function create_default_slot_2(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*list*/ ctx[0] && /*list*/ ctx[0].length && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*list*/ ctx[0] && /*list*/ ctx[0].length) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*list*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
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
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(47:6) <DetailsCard         index={1}         className=\\\"col-span-2 row-span-4\\\"       >",
    		ctx
    	});

    	return block;
    }

    // (73:6) <DetailsCard         index={3}         className="col-span-1 row-span-1 row-start-4 col-start-1"         innerClassName="flex flex-col justify-center items-center"       >
    function create_default_slot_1(ctx) {
    	let p;
    	let time_1;
    	let current;

    	time_1 = new Time({
    			props: { time: /*time*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			p = element("p");
    			create_component(time_1.$$.fragment);
    			attr_dev(p, "class", "text-2xl font-bold text-base-content/80");
    			add_location(p, file$2, 77, 8, 2405);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			mount_component(time_1, p, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const time_1_changes = {};
    			if (dirty & /*time*/ 2) time_1_changes.time = /*time*/ ctx[1];
    			time_1.$set(time_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(time_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(time_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			destroy_component(time_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(73:6) <DetailsCard         index={3}         className=\\\"col-span-1 row-span-1 row-start-4 col-start-1\\\"         innerClassName=\\\"flex flex-col justify-center items-center\\\"       >",
    		ctx
    	});

    	return block;
    }

    // (89:8) {#each tags as tag, index}
    function create_each_block(ctx) {
    	let span;
    	let html_tag;
    	let raw_value = /*tag*/ ctx[6] + "";
    	let t;
    	let span_intro;
    	let span_outro;
    	let current;

    	const block = {
    		c: function create() {
    			span = element("span");
    			html_tag = new HtmlTag(false);
    			t = space();
    			html_tag.a = t;
    			attr_dev(span, "class", "badge badge-primary badge-sm");
    			add_location(span, file$2, 89, 10, 2750);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			html_tag.m(raw_value, span);
    			append_dev(span, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*tags*/ 4) && raw_value !== (raw_value = /*tag*/ ctx[6] + "")) html_tag.p(raw_value);
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!current) return;
    				if (span_outro) span_outro.end(1);

    				span_intro = create_in_transition(span, fly, {
    					x: 100,
    					delay: 50 * /*index*/ ctx[8] + 500
    				});

    				span_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (span_intro) span_intro.invalidate();

    			span_outro = create_out_transition(span, fly, {
    				x: 100,
    				delay: 30 * /*index*/ ctx[8],
    				duration: 100
    			});

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching && span_outro) span_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(89:8) {#each tags as tag, index}",
    		ctx
    	});

    	return block;
    }

    // (84:6) <DetailsCard         index={4}         className="col-span-3 bg-primary/30 pr-1 h-6 p-0"         innerClassName="flex justify-center items-center gap-1"       >
    function create_default_slot(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*tags*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
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
    				if (each_blocks[i]) {
    					each_blocks[i].m(target, anchor);
    				}
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tags*/ 4) {
    				each_value = /*tags*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
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
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(84:6) <DetailsCard         index={4}         className=\\\"col-span-3 bg-primary/30 pr-1 h-6 p-0\\\"         innerClassName=\\\"flex justify-center items-center gap-1\\\"       >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div2;
    	let div1;
    	let button;
    	let i;
    	let button_transition;
    	let t0;
    	let div0;
    	let detailscard0;
    	let t1;
    	let detailscard1;
    	let t2;
    	let detailscard2;
    	let t3;
    	let detailscard3;
    	let div2_intro;
    	let div2_outro;
    	let current;
    	let mounted;
    	let dispose;

    	detailscard0 = new DetailsCard({
    			props: {
    				index: 2,
    				className: "w-full relative col-span-1 bg-secondary/40 row-span-3",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	detailscard1 = new DetailsCard({
    			props: {
    				index: 1,
    				className: "col-span-2 row-span-4",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	detailscard2 = new DetailsCard({
    			props: {
    				index: 3,
    				className: "col-span-1 row-span-1 row-start-4 col-start-1",
    				innerClassName: "flex flex-col justify-center items-center",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	detailscard3 = new DetailsCard({
    			props: {
    				index: 4,
    				className: "col-span-3 bg-primary/30 pr-1 h-6 p-0",
    				innerClassName: "flex justify-center items-center gap-1",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			button = element("button");
    			i = element("i");
    			t0 = space();
    			div0 = element("div");
    			create_component(detailscard0.$$.fragment);
    			t1 = space();
    			create_component(detailscard1.$$.fragment);
    			t2 = space();
    			create_component(detailscard2.$$.fragment);
    			t3 = space();
    			create_component(detailscard3.$$.fragment);
    			attr_dev(i, "class", "ph-bold ph-x cursor-pointer");
    			add_location(i, file$2, 33, 6, 1010);
    			attr_dev(button, "class", "absolute -top-12 right-0 flex h-12 w-12 items-center justify-center text-2xl text-base-content transition-transform hover:rotate-90 xl:-right-12 xl:top-0");
    			add_location(button, file$2, 28, 4, 740);
    			attr_dev(div0, "class", "relative inset-0 grid h-full w-full grid-cols-3 gap-8");
    			add_location(div0, file$2, 35, 4, 1070);
    			attr_dev(div1, "class", "fixed inset-8 top-16 xl:inset-1/4");
    			add_location(div1, file$2, 26, 2, 662);
    			attr_dev(div2, "class", "fixed inset-0 z-30 bg-base-100/70");
    			add_location(div2, file$2, 21, 0, 536);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, button);
    			append_dev(button, i);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			mount_component(detailscard0, div0, null);
    			append_dev(div0, t1);
    			mount_component(detailscard1, div0, null);
    			append_dev(div0, t2);
    			mount_component(detailscard2, div0, null);
    			append_dev(div0, t3);
    			mount_component(detailscard3, div0, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", closeModal, false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const detailscard0_changes = {};

    			if (dirty & /*$$scope, heading*/ 2056) {
    				detailscard0_changes.$$scope = { dirty, ctx };
    			}

    			detailscard0.$set(detailscard0_changes);
    			const detailscard1_changes = {};

    			if (dirty & /*$$scope, list, $contentLangState*/ 2065) {
    				detailscard1_changes.$$scope = { dirty, ctx };
    			}

    			detailscard1.$set(detailscard1_changes);
    			const detailscard2_changes = {};

    			if (dirty & /*$$scope, time*/ 2050) {
    				detailscard2_changes.$$scope = { dirty, ctx };
    			}

    			detailscard2.$set(detailscard2_changes);
    			const detailscard3_changes = {};

    			if (dirty & /*$$scope, tags*/ 2052) {
    				detailscard3_changes.$$scope = { dirty, ctx };
    			}

    			detailscard3.$set(detailscard3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!current) return;
    				if (!button_transition) button_transition = create_bidirectional_transition(button, fade, { duration: 300, delay: 300 }, true);
    				button_transition.run(1);
    			});

    			transition_in(detailscard0.$$.fragment, local);
    			transition_in(detailscard1.$$.fragment, local);
    			transition_in(detailscard2.$$.fragment, local);
    			transition_in(detailscard3.$$.fragment, local);

    			add_render_callback(() => {
    				if (!current) return;
    				if (div2_outro) div2_outro.end(1);
    				div2_intro = create_in_transition(div2, fade, { duration: 200 });
    				div2_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!button_transition) button_transition = create_bidirectional_transition(button, fade, { duration: 300, delay: 300 }, false);
    			button_transition.run(0);
    			transition_out(detailscard0.$$.fragment, local);
    			transition_out(detailscard1.$$.fragment, local);
    			transition_out(detailscard2.$$.fragment, local);
    			transition_out(detailscard3.$$.fragment, local);
    			if (div2_intro) div2_intro.invalidate();
    			div2_outro = create_out_transition(div2, fade, { duration: 300, delay: 300 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (detaching && button_transition) button_transition.end();
    			destroy_component(detailscard0);
    			destroy_component(detailscard1);
    			destroy_component(detailscard2);
    			destroy_component(detailscard3);
    			if (detaching && div2_outro) div2_outro.end();
    			mounted = false;
    			dispose();
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
    	let $showModalState;
    	let $contentLangState;
    	validate_store(showModalState, 'showModalState');
    	component_subscribe($$self, showModalState, $$value => $$invalidate(5, $showModalState = $$value));
    	validate_store(contentLangState, 'contentLangState');
    	component_subscribe($$self, contentLangState, $$value => $$invalidate(4, $contentLangState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DetailsModal', slots, []);
    	let list;
    	let time;
    	let tags;
    	let heading;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DetailsModal> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		DetailsCard,
    		fade,
    		fly,
    		closeModal,
    		contentLangState,
    		showModalState,
    		getIntlContent,
    		Time,
    		list,
    		time,
    		tags,
    		heading,
    		$showModalState,
    		$contentLangState
    	});

    	$$self.$inject_state = $$props => {
    		if ('list' in $$props) $$invalidate(0, list = $$props.list);
    		if ('time' in $$props) $$invalidate(1, time = $$props.time);
    		if ('tags' in $$props) $$invalidate(2, tags = $$props.tags);
    		if ('heading' in $$props) $$invalidate(3, heading = $$props.heading);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$showModalState*/ 32) {
    			{
    				const state = $showModalState;

    				if (state !== undefined) {
    					$$invalidate(0, list = state.list);
    					$$invalidate(1, time = state.time);
    					$$invalidate(2, tags = state.tags);
    					$$invalidate(3, heading = state.heading);
    				}
    			}
    		}
    	};

    	return [list, time, tags, heading, $contentLangState, $showModalState];
    }

    class DetailsModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DetailsModal",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/Main.svelte generated by Svelte v3.59.2 */
    const file$1 = "src/components/Main.svelte";

    // (14:0) {#if $showModalState !== undefined}
    function create_if_block(ctx) {
    	let detailsmodal;
    	let current;
    	detailsmodal = new DetailsModal({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(detailsmodal.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(detailsmodal, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(detailsmodal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(detailsmodal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(detailsmodal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(14:0) {#if $showModalState !== undefined}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let main;
    	let cvitems0;
    	let t0;
    	let cvitems1;
    	let t1;
    	let skills;
    	let t2;
    	let if_block_anchor;
    	let current;

    	cvitems0 = new CvItems({
    			props: { cvItems: /*$cvJobItemsState*/ ctx[0] },
    			$$inline: true
    		});

    	cvitems1 = new CvItems({
    			props: { cvItems: /*$cvEduItemsState*/ ctx[1] },
    			$$inline: true
    		});

    	skills = new Skills({
    			props: { skills: /*$skillsState*/ ctx[2] },
    			$$inline: true
    		});

    	let if_block = /*$showModalState*/ ctx[3] !== undefined && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(cvitems0.$$.fragment);
    			t0 = space();
    			create_component(cvitems1.$$.fragment);
    			t1 = space();
    			create_component(skills.$$.fragment);
    			t2 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			add_location(main, file$1, 7, 0, 300);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(cvitems0, main, null);
    			append_dev(main, t0);
    			mount_component(cvitems1, main, null);
    			append_dev(main, t1);
    			mount_component(skills, main, null);
    			insert_dev(target, t2, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const cvitems0_changes = {};
    			if (dirty & /*$cvJobItemsState*/ 1) cvitems0_changes.cvItems = /*$cvJobItemsState*/ ctx[0];
    			cvitems0.$set(cvitems0_changes);
    			const cvitems1_changes = {};
    			if (dirty & /*$cvEduItemsState*/ 2) cvitems1_changes.cvItems = /*$cvEduItemsState*/ ctx[1];
    			cvitems1.$set(cvitems1_changes);
    			const skills_changes = {};
    			if (dirty & /*$skillsState*/ 4) skills_changes.skills = /*$skillsState*/ ctx[2];
    			skills.$set(skills_changes);

    			if (/*$showModalState*/ ctx[3] !== undefined) {
    				if (if_block) {
    					if (dirty & /*$showModalState*/ 8) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cvitems0.$$.fragment, local);
    			transition_in(cvitems1.$$.fragment, local);
    			transition_in(skills.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cvitems0.$$.fragment, local);
    			transition_out(cvitems1.$$.fragment, local);
    			transition_out(skills.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(cvitems0);
    			destroy_component(cvitems1);
    			destroy_component(skills);
    			if (detaching) detach_dev(t2);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
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
    	let $cvJobItemsState;
    	let $cvEduItemsState;
    	let $skillsState;
    	let $showModalState;
    	validate_store(cvJobItemsState, 'cvJobItemsState');
    	component_subscribe($$self, cvJobItemsState, $$value => $$invalidate(0, $cvJobItemsState = $$value));
    	validate_store(cvEduItemsState, 'cvEduItemsState');
    	component_subscribe($$self, cvEduItemsState, $$value => $$invalidate(1, $cvEduItemsState = $$value));
    	validate_store(skillsState, 'skillsState');
    	component_subscribe($$self, skillsState, $$value => $$invalidate(2, $skillsState = $$value));
    	validate_store(showModalState, 'showModalState');
    	component_subscribe($$self, showModalState, $$value => $$invalidate(3, $showModalState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Main', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Main> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		cvEduItemsState,
    		cvJobItemsState,
    		skillsState,
    		CvItems,
    		Skills,
    		showModalState,
    		DetailsModal,
    		$cvJobItemsState,
    		$cvEduItemsState,
    		$skillsState,
    		$showModalState
    	});

    	return [$cvJobItemsState, $cvEduItemsState, $skillsState, $showModalState];
    }

    class Main extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Main",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.59.2 */

    const { window: window_1 } = globals;
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let hero;
    	let t0;
    	let div0;
    	let main;
    	let t1;
    	let footer;
    	let t2;
    	let filtersidebar;
    	let t3;
    	let div1;
    	let button0;
    	let i0;
    	let t4;
    	let button1;
    	let i1;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowscroll*/ ctx[1]);
    	hero = new Hero({ $$inline: true });
    	main = new Main({ $$inline: true });
    	footer = new Footer({ $$inline: true });
    	filtersidebar = new FilterSidebar({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(hero.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			create_component(main.$$.fragment);
    			t1 = space();
    			create_component(footer.$$.fragment);
    			t2 = space();
    			create_component(filtersidebar.$$.fragment);
    			t3 = space();
    			div1 = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t4 = space();
    			button1 = element("button");
    			i1 = element("i");
    			add_location(div0, file, 13, 0, 386);
    			attr_dev(i0, "class", "ph-bold ph-funnel-simple");
    			add_location(i0, file, 25, 4, 685);
    			attr_dev(button0, "class", "btn-primary btn-outline btn h-12 w-12 rounded-full text-xl");
    			add_location(button0, file, 21, 2, 550);
    			attr_dev(i1, "class", "ph-bold ph-file-pdf");
    			add_location(i1, file, 31, 4, 861);
    			attr_dev(button1, "class", "btn-primary btn-outline btn h-12 w-12 rounded-full text-xl");
    			add_location(button1, file, 27, 2, 738);
    			attr_dev(div1, "class", "fixed bottom-0 right-12 z-20 flex h-1/5 flex-col justify-around align-middle print:hidden");
    			add_location(div1, file, 18, 0, 441);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(hero, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div0, anchor);
    			mount_component(main, div0, null);
    			append_dev(div0, t1);
    			mount_component(footer, div0, null);
    			insert_dev(target, t2, anchor);
    			mount_component(filtersidebar, target, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, button0);
    			append_dev(button0, i0);
    			append_dev(div1, t4);
    			append_dev(div1, button1);
    			append_dev(button1, i1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window_1, "scroll", () => {
    						scrolling = true;
    						clearTimeout(scrolling_timeout);
    						scrolling_timeout = setTimeout(clear_scrolling, 100);
    						/*onwindowscroll*/ ctx[1]();
    					}),
    					listen_dev(button0, "click", /*click_handler*/ ctx[2], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[3], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*y*/ 1 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(window_1.pageXOffset, /*y*/ ctx[0]);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(hero.$$.fragment, local);
    			transition_in(main.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			transition_in(filtersidebar.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(hero.$$.fragment, local);
    			transition_out(main.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			transition_out(filtersidebar.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(hero, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div0);
    			destroy_component(main);
    			destroy_component(footer);
    			if (detaching) detach_dev(t2);
    			destroy_component(filtersidebar, detaching);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			run_all(dispose);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let y;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function onwindowscroll() {
    		$$invalidate(0, y = window_1.pageYOffset);
    	}

    	const click_handler = () => showSidebarState.set(true);
    	const click_handler_1 = () => window.print();

    	$$self.$capture_state = () => ({
    		FilterSidebar,
    		Footer,
    		Hero,
    		Main,
    		showSidebarState,
    		y
    	});

    	$$self.$inject_state = $$props => {
    		if ('y' in $$props) $$invalidate(0, y = $$props.y);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [y, onwindowscroll, click_handler, click_handler_1];
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

    var app = new App({
        target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
