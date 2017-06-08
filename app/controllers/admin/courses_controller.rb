class Admin::CoursesController < AdminController
  before_action :set_course, only: [:destroy, :edit, :update]

  def index
    @courses = Course.all
  end

  def new
    @course = Course.new
  end

  def edit
  end

  def update
  end

  def create
    @course = Course.new(course_params)
    if @course.save
      redirect_to admin_courses_path, notice: helpers.alert_success('Matéria adicionada com êxito.')
    else
      render :new
    end
  end

  def destroy
  end


end