// Backbone Model
var Blog = Backbone.Model.extend({
    defaults: {
        author: '',
        title: '',
        url: ''
    }
});

//Backbone collection (array of models)
var Blogs = Backbone.Collection.extend({});

//instantiate a collection
var blogs = new Blogs();

// Backbone View for single blog
var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function() {
        this.template = _.template($(".blogs-list-template").html());
    },
    events: {
        'click .editBlog': 'edit',
        'click .updateBlog': 'update',
        'click .cancelUpdate': 'cancel',
        'click .deleteBlog': 'delete'
    },
    edit: function() {
        $(".editBlog").toggleClass('hidden');
        $(".deleteBlog").toggleClass('hidden');
        this.$(".updateBlog").toggleClass('hidden');
        this.$(".cancelUpdate").toggleClass('hidden');

        var author = this.$('.author').html();
        var title = this.$('.title').html();
        var url = this.$('.url').html();

        //author edit input
        this.$('.author').html('<input type="text" class="form-control authorUpdate" value="' + author + '"></input>');

        //title edit input
        this.$('.title').html('<input type="text" class="form-control titleUpdate" value="' + title + '"></input>');

        //url edit input
        this.$('.url').html('<input type="text" class="form-control urlUpdate" value="' + url + '"></input>');
    },
    update: function(){
        //set values from the edited input boxes to be the new values
        this.model.set('author', $('.authorUpdate').val());
        this.model.set('title', $('.titleUpdate').val());
        this.model.set('url', $('.urlUpdate').val());
    },
    cancel: function() {
        blogViews.render();
    },
    delete: function() {
        this.model.destroy();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

// Backbone View for all blogs
var BlogViews = Backbone.View.extend({
    model: blogs,
    el: $('.blogs-list'),
    initialize: function() {
        var self = this;
        this.model.on('add', this.render, this);
        this.model.on('change', function() {
            setTimeout(function() {
                self.render();
            }, 30);
        }, this);
        this.model.on('remove', this.render, this);
    },
    render: function() {
        var self =  this;
        this.$el.html('');
        _.each(this.model.toArray(), function(blog) {
            self.$el.append((new BlogView({model: blog})).render().$el);
        });
        return this;
    }
});

var blogViews =  new BlogViews();

$(document).ready(function(){
    $('.addBlog').on("click", function(){
        var blog = new Blog({
            author: $('.authorInput').val(),
            title: $('.titleInput').val(),
            url: $('.urlInput').val()
        });
        //clear forms after blog is added
        $('.authorInput').val('');
        $('.titleInput').val('');
        $('.urlInput').val('');
        
        blogs.add(blog);
    });
});