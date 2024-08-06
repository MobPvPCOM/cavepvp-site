package com.mobpvp.site.model.support.format;

import lombok.Getter;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Getter
public class QuestionSet {

    private final Map<Integer, Question> questions = new LinkedHashMap<>();
    private final Map<String, String> placeholders = new HashMap<>();

    private int currentId = 0;

    public QuestionSet add(String question, int rows) {
        int newId = currentId++;
        questions.put(newId, new Question(newId, question, rows));
        return this;
    }

    public QuestionSet add(int id, String question, int rows) {
        questions.put(id, new Question(id, question, rows));
        return this;
    }

    public QuestionSet setPlaceholder(String placeholder, String value) {
        placeholders.put("{" + placeholder.toLowerCase() + "}", value);
        return this;
    }

    public Map<Integer, Question> getFormattedQuestions() {
        Map<Integer, Question> formatted = new LinkedHashMap<>();

        questions.forEach((id, questionObject) -> {
            String question = questionObject.getQuestion();

            for (Map.Entry<String, String> entry : placeholders.entrySet())
                question = question.replace(entry.getKey(), entry.getValue());

            formatted.put(id, new Question(id, question, questionObject.getRows()));
        });

        return formatted;
    }

    public QuestionSet clone(String placeholder, String value) {
        QuestionSet clone = new QuestionSet();

        for (Map.Entry<Integer, Question> entry : questions.entrySet())
            clone.getQuestions().put(entry.getKey(), entry.getValue());

        return clone.setPlaceholder(placeholder, value);
    }

}