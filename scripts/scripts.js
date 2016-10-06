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
        this.model.on('add', this.render, this);
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