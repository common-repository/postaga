( function( wp ) {
    var el = wp.element.createElement;
    var __ = wp.i18n.__;
    var registerPlugin = wp.plugins.registerPlugin;

    // Using ES5 syntax
    var PluginPostStatusInfo = wp.editPost.PluginPostStatusInfo;
    var PluginPostPublishPanel = wp.editPost.PluginPostPublishPanel;
    var editorData = wp.data.select("core/editor");
    var url = wp.url;
    var Post = editorData.getCurrentPost();

    function PostagaButton(){
        Post = wp.data.select( 'core/editor' ).getCurrentPost();
        var permalink = url.safeDecodeURI(Post.link);

        return wp.element.createElement( 'a',
            {
                href: 'https://app.postaga.com/a/campaign/create?url=' + permalink,
                target: '_blank',
                style: {width: '100%', justifyContent: 'center'},
                class: 'components-button editor-post-preview is-button is-default is-large'
            },
            [
                wp.element.createElement( 'img',
                    {
                        src: POSTAGA.icon,
                        style: {width: '20px', margin: '3px 15px 0 0', height: '20px'},
                    }
                ),
                'Open in Postaga'
            ]
        );
    }

    function PostagaStatusInfo() {
        Post = wp.data.select( 'core/editor' ).getCurrentPost();

        if( Post.status != 'publish' ) return null;

        return wp.element.createElement(
            PluginPostStatusInfo,
            {
                className: 'postaga-post-status-info'
            },
            PostagaButton()
        );
    }

    function PostagaPostPublishInfo() {
        return wp.element.createElement(
            PluginPostPublishPanel,
            {
                className: 'postaga-post-publish-panel',
                title: __( 'Postaga' ),
                initialOpen: true,
                icon: null
            },
            wp.element.createElement( 'span',
                {
                    target: '_blank',
                    style: {width: '100%', justifyContent: 'center'},
                    class: 'components-button editor-post-preview is-button is-default is-large',
                    onClick: function(){
                        wp.data.dispatch( 'core/editor' ).updateEditorSettings();
                        Post = wp.data.select( 'core/editor' ).getCurrentPost();
                        var permalink = url.safeDecodeURI(Post.link);
                        window.location = 'https://app.postaga.com/a/campaign/create?url=' + permalink;
                    }
                },
                [
                    wp.element.createElement( 'img',
                        {
                            src: POSTAGA.icon,
                            style: {width: '20px', margin: '3px 15px 0 0', height: '20px'},
                        }
                    ),
                    'Open in Postaga'
                ]
            )
        );
    }

    registerPlugin( 'postaga-status-info', {
        render: PostagaStatusInfo
    } );
    registerPlugin( 'postaga-post-publish-info', {
        render: PostagaPostPublishInfo
    } );

} )( window.wp );
